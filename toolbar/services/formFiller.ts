// toolbar/services/formFiller.ts
import axios from 'axios';
import { ContextItem } from '../models/context.model';

// Individual form field response
interface FormFieldResponse {
    querySelectorInput: string;
    label: string;
    value: string;
}

// New API response format
interface ApiResponse {
    type: 'direct' | 'enter';
    domain: string;
    fillJSON: FormFieldResponse[];
}

class FormFillerService {
    private apiBaseUrl: string = 'http://localhost:8000/api/v1/form';
    
    /**
     * Set the base API URL for the form filler service
     */
    public setApiUrl(url: string): void {
        this.apiBaseUrl = url;
    }
    
    /**
     * Get the current host domain
     */
    private getDomain(): string {
        return window.location.hostname;
    }
    
    /**
     * Get the current page DOM as a string
     */
    private getPageDOM(): string {
        return document.documentElement.outerHTML;
    }
    
    /**
     * Format contexts into a single string for the API
     */
    private formatContextsForPrompt(contexts: ContextItem[]): string {
        if (!contexts || contexts.length === 0) {
            return "";
        }
        
        return contexts.map(context => 
            `CONTEXT TITLE: ${context.title}\nCONTEXT DESCRIPTION: ${context.description}`
        ).join("\n\n");
    }
    
    /**
     * Sleep/wait function for sequential form filling
     */
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Simulates pressing Enter on an input element
     */
    private triggerEnterKey(element: HTMLElement): void {
        // Create and dispatch a keyboard event for the Enter key
        const enterEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true
        });
        
        element.dispatchEvent(enterEvent);
        
        // Also trigger form submission in case the form listens for that
        const form = element.closest('form');
        if (form) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(submitEvent);
        }
    }
    
    /**
     * Fill a single form element and return success status
     */
    private fillFormElement(element: FormFieldResponse): boolean {
        try {
            const input = document.querySelector(element.querySelectorInput);
            if (!input) return false;
            
            // Handle different input types
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                input.value = element.value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                return true;
            } else if (input instanceof HTMLSelectElement) {
                const options = Array.from(input.options);
                const option = options.find(opt => 
                    opt.text.toLowerCase().includes(element.value.toLowerCase()) || 
                    opt.value.toLowerCase().includes(element.value.toLowerCase())
                );
                
                if (option) {
                    input.value = option.value;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    return true;
                }
            }
            return false;
        } catch (err) {
            console.error(`Error filling element ${element.querySelectorInput}:`, err);
            return false;
        }
    }
    
    /**
     * Fill form elements in "direct" mode (all at once)
     */
    private fillDirectMode(formElements: FormFieldResponse[]): number {
        let filledCount = 0;
        
        formElements.forEach(element => {
            const success = this.fillFormElement(element);
            if (success) filledCount++;
        });
        
        return filledCount;
    }
    
    /**
     * Fill form elements in "enter" mode (one by one with Enter key)
     */
    private async fillEnterMode(formElements: FormFieldResponse[]): Promise<number> {
        let filledCount = 0;
        
        for (const element of formElements) {
            try {
                // Fill the form element
                const success = this.fillFormElement(element);
                
                if (success) {
                    filledCount++;
                    
                    // Get the element reference
                    const input = document.querySelector(element.querySelectorInput);
                    if (input instanceof HTMLElement) {
                        // Trigger Enter key
                        this.triggerEnterKey(input);
                        
                        // Wait for the form to process
                        await this.sleep(1000);
                    }
                }
            } catch (error) {
                console.error(`Error in sequential form filling for ${element.querySelectorInput}:`, error);
            }
        }
        
        return filledCount;
    }
    
    /**
     * Fill the form on the current page automatically
     * Uses a generic prompt to ask the AI to fill the form with appropriate information
     * @param contexts The knowledge base contexts to include in the prompt
     */
    public async autoFillForm(contexts: ContextItem[]): Promise<boolean> {
        try {
            // Show loading indicator
            this.showLoadingIndicator();
            
            // Get current domain and page DOM
            const domain = this.getDomain();
            const dom = this.getPageDOM();
            
            // Format contexts for the prompt
            const contextsText = this.formatContextsForPrompt(contexts);
            
            // Create a prompt that incorporates the contexts
            let userPrompt = "Please fill this form with appropriate information based on the field labels";
            if (contextsText) {
                userPrompt = `Please fill this form with information based on the following contexts:\n\n${contextsText}\n\nUse this information to fill out the form appropriately.`;
            }
            
            // Prepare request body
            const formData = {
                dom,
                user_prompt: userPrompt,
                custom_command: "Use the provided contexts to fill the form fields. If a field doesn't have relevant information in the contexts, use reasonable default values."
            };
            
            console.log(`Sending request to ${this.apiBaseUrl}/${domain}`);
            console.log('Including contexts:', contexts.length > 0 ? 'Yes' : 'No');
            
            // Call the API
            const response = await axios.post<ApiResponse>(
                `${this.apiBaseUrl}/${domain}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            
            // Check if we got valid response
            if (!response.data || !response.data.fillJSON || response.data.fillJSON.length === 0) {
                this.hideLoadingIndicator();
                console.log('response from API', !response.data)
                console.error('No form elements returned from API');
                this.showMessage('No form elements detected', 'error');
                return false;
            }
            
            const { type, fillJSON: formElements } = response.data;
            let filledCount = 0;
            
            // Handle different form filling modes
            if (type === 'enter') {
                // Sequential filling with Enter key
                console.log('Using sequential "enter" mode for form filling');
                filledCount = await this.fillEnterMode(formElements);
            } else {
                // Default direct mode - fill all at once
                console.log('Using direct mode for form filling');
                filledCount = this.fillDirectMode(formElements);
            }
            
            // Hide loading indicator
            this.hideLoadingIndicator();
            
            console.log(`Filled ${filledCount} of ${formElements.length} form elements using ${type} mode`);
            
            if (filledCount > 0) {
                this.showMessage(`Successfully filled ${filledCount} form fields!`, 'success');
                return true;
            } else {
                this.showMessage('Could not fill any form fields', 'error');
                return false;
            }
        } catch (error) {
            this.hideLoadingIndicator();
            console.error('Error calling form API:', error);
            if (axios.isAxiosError(error)) {
                console.error('Response status:', error.response?.status);
                console.error('Response data:', error.response?.data);
            }
            this.showMessage('Error filling form', 'error');
            return false;
        }
    }
    
    /**
     * Show a loading indicator while the form is being processed
     */
    private showLoadingIndicator(): void {
        const existingIndicator = document.getElementById('autoact-loading-indicator');
        if (existingIndicator) return;
        
        const indicator = document.createElement('div');
        indicator.id = 'autoact-loading-indicator';
        indicator.style.position = 'fixed';
        indicator.style.top = '20px';
        indicator.style.right = '20px';
        indicator.style.backgroundColor = '#3b82f6';
        indicator.style.color = 'white';
        indicator.style.padding = '10px 15px';
        indicator.style.borderRadius = '4px';
        indicator.style.zIndex = '10000';
        indicator.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        indicator.innerText = 'AutoAct: Filling form...';
        
        document.body.appendChild(indicator);
    }
    
    /**
     * Hide the loading indicator
     */
    private hideLoadingIndicator(): void {
        const indicator = document.getElementById('autoact-loading-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    /**
     * Show a message to the user
     */
    private showMessage(message: string, type: 'success' | 'error'): void {
        // Remove any existing messages
        const existingMessage = document.getElementById('autoact-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.id = 'autoact-message';
        messageElement.style.position = 'fixed';
        messageElement.style.bottom = '20px';
        messageElement.style.right = '20px';
        messageElement.style.color = 'white';
        messageElement.style.padding = '10px 15px';
        messageElement.style.borderRadius = '4px';
        messageElement.style.zIndex = '10000';
        messageElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        
        if (type === 'success') {
            messageElement.style.backgroundColor = '#10b981'; // Green
        } else {
            messageElement.style.backgroundColor = '#ef4444'; // Red
        }
        
        messageElement.innerText = message;
        
        document.body.appendChild(messageElement);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
}

export const formFillerService = new FormFillerService();