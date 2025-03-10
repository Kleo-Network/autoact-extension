import React, { useEffect, useState } from 'react';
import { ButtonPosition } from '../models/common.model';
import { ContextFormValues, ContextItem } from '../models/context.model';
import { formFillerService } from '../services/formFiller';
import AddToAutoAct from './components/AddToAutoAct';
import Modal from './components/Modal';
import Toolbar from './components/Toolbar';

// Configuration settings for API URLs - you might want to move this to a config file
const API_BASE_URL = 'http://localhost:8000/api/v1/form';
const FORM_DETECTION_API_URL = 'http://localhost:8000/api/v1/form-detect';
const FALSE_POSITIVE_API_URL = 'http://localhost:8000/api/v1/form/false_positive_forms';

const ContentPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({
        x: 0,
        y: 0,
    });
    const [pageData, setPageData] = useState<ContextFormValues>({
        title: '',
        description: '',
    });
    const [contexts, setContexts] = useState<ContextItem[]>([]);
    const [hasForm, setHasForm] = useState(false);
    const [formScore, setFormScore] = useState(0);

    // Initialize the form filler service when the component mounts
    useEffect(() => {
        formFillerService.setApiUrl(API_BASE_URL);
        detectForm();

        // Keep track of pending recalculation
        let recalculationTimeout: NodeJS.Timeout | null = null;

        // Set up MutationObserver with debounce to detect DOM changes
        const observer = new MutationObserver(() => {
            // Clear any existing timeout to debounce frequent changes
            if (recalculationTimeout) {
                clearTimeout(recalculationTimeout);
            }
            
            // Set a new timeout to recalculate after a short delay
            recalculationTimeout = setTimeout(async () => {
                try {
                    const allHtml = await getAllHtml();
                    const { windowUrl } = collectUrls();
                    const totalScore = calculateScoreFromHtml(allHtml);
                    setFormScore(totalScore);
                    
                    // If score meets threshold, check for false positive
                    if (totalScore >= 4) {
                        const isFalsePositive = await checkFalsePositive(windowUrl);
                        setHasForm(!isFalsePositive);
                    } else {
                        setHasForm(false);
                    }
                } catch (error) {
                    console.error('Error recalculating form score:', error);
                }
            }, 300); // 300ms debounce
        });
        
        // Observe changes to the DOM that might affect form visibility
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true, 
            attributeFilter: ['style', 'class', 'hidden', 'display', 'visibility'] 
        });
        
        // Cleanup observer and any pending timeout on unmount
        return () => {
            observer.disconnect();
            if (recalculationTimeout) {
                clearTimeout(recalculationTimeout);
            }
        };
    }, []);
    
    // Function to get all HTML including cross-origin iframes content
    const getAllHtml = async (): Promise<string> => {
        // Get main document HTML
        const html = document.documentElement.outerHTML;
        
        // Create an array to store promises for all iframe content
        const iframePromises: Promise<string>[] = [];
        
        // Find all iframes in the document
        const iframes = document.querySelectorAll('iframe');
        
        // For each iframe, try to get its content or request it via message passing
        Array.from(iframes).forEach((iframe) => {
            // Create a promise for each iframe
            const iframePromise = new Promise<string>((resolve) => {
                try {
                    // Try direct access first (this will work for same-origin iframes)
                    if (iframe.contentDocument) {
                        return resolve(iframe.contentDocument.documentElement.outerHTML);
                    }
                    
                    // For cross-origin iframes, we need special handling
                    // Send a message to the background script to capture content
                    // This requires content script injection permission in manifest.json
                    chrome.runtime.sendMessage(
                        { 
                            action: 'captureIframeContent',
                            iframeSrc: iframe.src 
                        },
                        (response) => {
                            if (response && response.html) {
                                resolve(response.html);
                            } else {
                                resolve(''); // Empty string if no content available
                            }
                        }
                    );
                    
                    // Set a timeout for the message response
                    setTimeout(() => resolve(''), 500);
                } catch (e) {
                    console.log('Could not access iframe content:', e);
                    resolve('');
                }
            });
            
            iframePromises.push(iframePromise);
        });
        
        // Wait for all iframe promises to resolve
        const iframeContents = await Promise.all(iframePromises);
        
        // Combine main document HTML with all iframe contents
        return html + iframeContents.join('');
    };
    
    // Function to collect URLs from main window and all iframes
    const collectUrls = (): { windowUrl: string; iframeUrls: string[] } => {
        const windowUrl = window.location.href;
        const iframes = document.querySelectorAll('iframe');
        const iframeUrls = Array.from(iframes)
            .map(iframe => iframe.src)
            .filter(src => src && src.trim() !== '');
            
        return { windowUrl, iframeUrls };
    };

    // Function to calculate form score from HTML string
    const calculateScoreFromHtml = (html: string): number => {
        try {
            // Create a temporary DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Helper function to check if an element is likely visible
            const isLikelyVisible = (element: Element): boolean => {
                // Check for common hidden attributes and CSS classes
                if (
                    element.hasAttribute('hidden') || 
                    element.hasAttribute('aria-hidden') ||
                    (element.hasAttribute('style') && 
                        (element.getAttribute('style')?.includes('display: none') || 
                         element.getAttribute('style')?.includes('visibility: hidden') ||
                         element.getAttribute('style')?.includes('opacity: 0'))) ||
                    element.classList.contains('hidden') ||
                    element.classList.contains('invisible')
                ) {
                    return false;
                }
                
                // Check if any parent is hidden
                let parent = element.parentElement;
                while (parent) {
                    if (
                        parent.hasAttribute('hidden') ||
                        parent.hasAttribute('aria-hidden') ||
                        (parent.hasAttribute('style') && 
                            (parent.getAttribute('style')?.includes('display: none') || 
                             parent.getAttribute('style')?.includes('visibility: hidden') ||
                             parent.getAttribute('style')?.includes('opacity: 0'))) ||
                        parent.classList.contains('hidden') ||
                        parent.classList.contains('invisible')
                    ) {
                        return false;
                    }
                    parent = parent.parentElement;
                }
                
                return true;
            };
            
            // Count form elements that are likely visible
            const inputs = Array.from(doc.querySelectorAll('input')).filter(isLikelyVisible);
            const textareas = Array.from(doc.querySelectorAll('textarea')).filter(isLikelyVisible);
            const selects = Array.from(doc.querySelectorAll('select')).filter(isLikelyVisible);
            
            const radioButtons = inputs.filter(input => input.type === 'radio');
            const checkboxes = inputs.filter(input => input.type === 'checkbox');
            const otherInputs = inputs.filter(input => input.type !== 'radio' && input.type !== 'checkbox');
            
            // Calculate score according to scoring system
            const score = 
                otherInputs.length * 1 +        // Regular inputs: 1 point each
                textareas.length * 3 +          // Textareas: 3 points each
                selects.length * 2 +            // Selects: 2 points each
                radioButtons.length * 3 +       // Radio buttons: 3 points each
                checkboxes.length * 3;          // Checkboxes: 3 points each
            
            return score;
        } catch (e) {
            console.error('Error calculating score from HTML:', e);
            return 0;
        }
    };
    
    // Function to check if current URL is a false positive
    const checkFalsePositive = async (windowUrl: string): Promise<boolean> => {
        try {
            const response = await fetch(FALSE_POSITIVE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    url: windowUrl
                }),
            });
            
            const data = await response.json();
            // If the API says it's a false positive (form: false), return true
            return data.form === false;
        } catch (error) {
            console.error('Error checking false positive:', error);
            return false; // If API fails, assume it's not a false positive
        }
    };

    // Function to detect if the page contains a form
    const detectForm = async () => {
        try {
            // Gather all HTML content including iframes
            const allHtml = await getAllHtml();
            const { windowUrl, iframeUrls } = collectUrls();
            
            // First criterion: Check with API
            const response = await fetch(FORM_DETECTION_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    html: allHtml,
                    windowUrl,
                    iframeUrls
                }),
            });
            
            const data = await response.json();
            
            // If API returns true, display the toolbar
            if (data.form === true) {
                setHasForm(true);
                return;
            }
            
            // Second criterion: Calculate score from HTML
            const totalScore = calculateScoreFromHtml(allHtml);
            setFormScore(totalScore);
            
            // If score is >= 4, perform false positive check
            if (totalScore >= 4) {
                // Check if this URL is in the false positive list
                const isFalsePositive = await checkFalsePositive(windowUrl);
                
                // Only show toolbar if it's not a false positive
                setHasForm(!isFalsePositive);
            } else {
                // Score not high enough to show toolbar
                setHasForm(false);
            }
            
        } catch (error) {
            console.error('Error detecting form:', error);
            
            // Fallback to scoring system if API call fails
            try {
                const allHtml = await getAllHtml();
                const { windowUrl } = collectUrls();
                const totalScore = calculateScoreFromHtml(allHtml);
                setFormScore(totalScore);
                
                // If score is >= 4, check for false positive
                if (totalScore >= 4) {
                    const isFalsePositive = await checkFalsePositive(windowUrl);
                    setHasForm(!isFalsePositive);
                } else {
                    setHasForm(false);
                }
            } catch (scoreError) {
                console.error('Error calculating form score:', scoreError);
                setHasForm(false);
            }
        }
    };

    const handleMouseUp = () => {
        const selection = window.getSelection(),
            selectedText = selection?.toString().trim() || '';

        if (selectedText?.length !== 0 && selection?.rangeCount) {
            setShowAddButton(false);
            setPageData({
                title: document.title,
                description: selectedText,
            });

            const range = selection.getRangeAt(0),
                rect = range.getBoundingClientRect();
            setButtonPosition({
                x: rect.left + window.scrollX,
                y: rect.bottom + window.scrollY,
            });

            setShowAddButton(true);
        }
    };

    const handleMouseDown = (event: MouseEvent) => {
        const element = event.composedPath()[0] as HTMLElement;

        if (
            element.id === 'btnAddToKnowledgebase' ||
            element.closest('#btnAddToKnowledgebase')
        )
            return;

        setShowAddButton(false);
    };

    const handleClick = () => {
        setTimeout(() => {
            const selection = window.getSelection()?.toString().trim();
            if (!selection) setShowAddButton(false);
        }, 0);
    };

    const fetchContexts = () => {
        chrome.runtime.sendMessage(
            { action: 'getContexts' },
            (response: { data: ContextItem[]; error: string | null }) => {
                if (response && !response.error) {
                    setContexts(response.data);
                }
            },
        );
    };

    const handleRefetchContexts = (message: { action: string }) => {
        if (message.action === 'refetchContexts') fetchContexts();
    };

    useEffect(() => {
        fetchContexts();
        chrome.runtime.onMessage.addListener(handleRefetchContexts);

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('click', handleClick);

        return () => {
            chrome.runtime.onMessage.removeListener(handleRefetchContexts);

            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const removeSelection = () => {
        document.getSelection()?.removeAllRanges();
        setShowAddButton(false);
    };

    const openSidebar = (
        contentType: 'contexts' | 'addNewContext',
        notifySidePanel = false,
    ) => {
        chrome.runtime.sendMessage({
            action: 'openSidePanel',
            contentType,
            notifySidePanel,
        });
    };

    const sendSelectedDataToSidebar = () => {
        removeSelection();
        chrome.runtime.sendMessage({
            action: 'scrappedPageData',
            pageData,
        });
        openSidebar('addNewContext', true);
    };

    const handleMagicWandClick = async () => {
        removeSelection();
        await formFillerService.autoFillForm(contexts);
    };

    return (
        <div className="font-inter">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                contexts={contexts}
            />
            
            {showAddButton && (
                <AddToAutoAct
                    buttonPosition={buttonPosition}
                    sendSelectedDataToSidebar={sendSelectedDataToSidebar}
                />
            )}
            
            {hasForm && (
                <Toolbar
                    contexts={contexts}
                    openSidebar={openSidebar}
                    removeSelection={removeSelection}
                    openModal={() => setIsModalOpen(true)}
                    onMagicWandClick={handleMagicWandClick}
                />
            )}
        </div>
    );
};

export default ContentPage;