 document.addEventListener('DOMContentLoaded', function() {
            const content = document.getElementById('content');
            const colorOptions = document.querySelectorAll('.color-option');
            const clearAllBtn = document.getElementById('clearAll');
            const toggleHighlightsBtn = document.getElementById('toggleHighlights');
            
            let selectedColor = '#fff59d';
            let highlightsVisible = true;
            
            // Initialize color selection
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    colorOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedColor = this.dataset.color;
                });
            });
            
            // Highlight selected text
            content.addEventListener('mouseup', function() {
                const selection = window.getSelection();
                if (!selection.isCollapsed) {
                    const range = selection.getRangeAt(0);
                    const selectedText = range.toString().trim();
                    
                    if (selectedText.length > 0) {
                        // Check if the selection is already within a highlight
                        let parentHighlight = range.startContainer.parentElement;
                        while (parentHighlight !== content) {
                            if (parentHighlight.classList.contains('highlight')) {
                                return; // Don't highlight within existing highlights
                            }
                            parentHighlight = parentHighlight.parentElement;
                        }
                        
                        // Create highlight span
                        const highlightSpan = document.createElement('span');
                        highlightSpan.className = 'highlight';
                        highlightSpan.style.backgroundColor = selectedColor;
                        
                        // Add remove button
                        const removeBtn = document.createElement('span');
                        removeBtn.className = 'highlight-remove';
                        removeBtn.innerHTML = '×';
                        removeBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const parent = this.parentElement;
                            const textNode = document.createTextNode(parent.textContent);
                            parent.parentNode.replaceChild(textNode, parent);
                            normalizeTextNodes(content);
                        });
                        
                        highlightSpan.appendChild(removeBtn);
                        
                        // Apply highlight
                        range.surroundContents(highlightSpan);
                        
                        // Clear selection
                        selection.removeAllRanges();
                        
                        // Normalize text nodes to prevent DOM fragmentation
                        normalizeTextNodes(content);
                    }
                }
            });
            
            // Clear all highlights
            clearAllBtn.addEventListener('click', function() {
                const highlights = content.querySelectorAll('.highlight');
                highlights.forEach(highlight => {
                    const textNode = document.createTextNode(highlight.textContent);
                    highlight.parentNode.replaceChild(textNode, highlight);
                });
                normalizeTextNodes(content);
            });
            
            // Toggle highlights visibility
            toggleHighlightsBtn.addEventListener('click', function() {
                highlightsVisible = !highlightsVisible;
                const highlights = content.querySelectorAll('.highlight');
                
                if (highlightsVisible) {
                    highlights.forEach(highlight => {
                        highlight.style.display = 'inline';
                    });
                    this.textContent = 'Hide Highlights';
                } else {
                    highlights.forEach(highlight => {
                        highlight.style.display = 'none';
                    });
                    this.textContent = 'Show Highlights';
                }
            });
            
            // Helper function to merge adjacent text nodes
            function normalizeTextNodes(element) {
                element.normalize();
                
                // Walk through all child nodes
                const walker = document.createTreeWalker(
                    element, 
                    NodeFilter.SHOW_TEXT, 
                    null, 
                    false
                );
                
                let node;
                let prevNode = null;
                const nodesToRemove = [];
                
                while (node = walker.nextNode()) {
                    if (prevNode && prevNode.nodeType === Node.TEXT_NODE && node.nodeType === Node.TEXT_NODE) {
                        prevNode.nodeValue += node.nodeValue;
                        nodesToRemove.push(node);
                    } else {
                        prevNode = node;
                    }
                }
                
                // Remove merged nodes
                nodesToRemove.forEach(node => {
                    node.parentNode.removeChild(node);
                });
            }
        });