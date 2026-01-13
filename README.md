**To Execute:**  
	•	Run npm install  
	•	Run the app with npm run dev  
   
**Assumptions & Design Decisions**  
• Scoped the solution to a single feature component with one required subcomponent, since the task focuses on component communication, not app architecture.  
• Implemented the email input as a controlled multi-value text input, not a dropdown, because values are user-entered rather than selected.  
• Kept validation and submission logic in the parent component to maintain clear data flow and keep the input component focused on presentation and interaction.  
• Used a fixed visible item limit with a +N overflow indicator to keep the implementation simple and predictable.  
  
**Challenges & How I Addressed Them**  
• Parent–child communication: Solved by lifting state to the parent and using explicit callbacks.  
• Single-line layout with overflow: Used a non-wrapping layout with an overflow indicator to preserve space while keeping all values accessible.  
• Popover clipping: Resolved by removing 'overflow: hidden' from the container so the popover could render correctly.  
