export default function makeError(validation, constraint, errorMessage) {
    const errors = validation.errors || [];
    const wrappedErrors = Array.isArray(errors) ? errors : [errors];
    return {
        ...validation,
        isInvalid: true,
        errors: [
            ...wrappedErrors,
            {
                error: constraint.constraintType,
                constraint: constraint,
                ...(errorMessage ? { errorMessage } : {}),
            },
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUNoQyxVQUFhLEVBQ2IsVUFBYSxFQUNiLFlBQXFCO0lBRXJCLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFBO0lBQ3RDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUUvRCxPQUFPO1FBQ04sR0FBRyxVQUFVO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUU7WUFDUCxHQUFHLGFBQWE7WUFDaEI7Z0JBQ0MsS0FBSyxFQUFFLFVBQVUsQ0FBQyxjQUFjO2dCQUNoQyxVQUFVLEVBQUUsVUFBZTtnQkFDM0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3pDO1NBQ3lCO0tBQzNCLENBQUE7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxuXHRWYWxpZGF0aW9uRXJyb3IsXG59IGZyb20gJy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlRXJyb3I8ViBleHRlbmRzIFZhbGlkYXRpb24sIEMgZXh0ZW5kcyBDb25zdHJhaW50Pihcblx0dmFsaWRhdGlvbjogVixcblx0Y29uc3RyYWludDogQyxcblx0ZXJyb3JNZXNzYWdlPzogc3RyaW5nLFxuKTogViB7XG5cdGNvbnN0IGVycm9ycyA9IHZhbGlkYXRpb24uZXJyb3JzIHx8IFtdXG5cdGNvbnN0IHdyYXBwZWRFcnJvcnMgPSBBcnJheS5pc0FycmF5KGVycm9ycykgPyBlcnJvcnMgOiBbZXJyb3JzXVxuXG5cdHJldHVybiB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHQuLi53cmFwcGVkRXJyb3JzLFxuXHRcdFx0e1xuXHRcdFx0XHRlcnJvcjogY29uc3RyYWludC5jb25zdHJhaW50VHlwZSxcblx0XHRcdFx0Y29uc3RyYWludDogY29uc3RyYWludCBhcyBDLFxuXHRcdFx0XHQuLi4oZXJyb3JNZXNzYWdlID8geyBlcnJvck1lc3NhZ2UgfSA6IHt9KSxcblx0XHRcdH0sXG5cdFx0XSBhcyBBcnJheTxWYWxpZGF0aW9uRXJyb3I+LFxuXHR9XG59XG4iXX0=