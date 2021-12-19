export default function convertToRealNumber(value) {
    if (typeof value === 'number') {
        return {
            datatype: 'real',
            value,
        };
    }
    if (value.datatype === 'fraction') {
        return {
            datatype: 'real',
            value: value.value.numerator /
                value.value.denominator,
        };
    }
    return {
        datatype: 'real',
        value: value.value,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE1BQU0sQ0FBQyxPQUFPLFVBQVUsbUJBQW1CLENBQzFDLEtBQTJCO0lBRTNCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU87WUFDTixRQUFRLEVBQUUsTUFBTTtZQUNoQixLQUFLO1NBQ0wsQ0FBQTtLQUNEO0lBRUQsSUFBSyxLQUFxQixDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDbkQsT0FBTztZQUNOLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFDSCxLQUF1QixDQUFDLEtBQUssQ0FBQyxTQUFTO2dCQUN2QyxLQUF1QixDQUFDLEtBQUssQ0FBQyxXQUFXO1NBQzNDLENBQUE7S0FDRDtJQUVELE9BQU87UUFDTixRQUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUcsS0FBMEIsQ0FBQyxLQUFLO0tBQ3hDLENBQUE7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0RnJhY3Rpb25WYWx1ZSxcblx0Tm9uRnJhY3Rpb25WYWx1ZSxcblx0TnVtYmVyVmFsdWUsXG5cdFJlYWxOdW1iZXJWYWx1ZSxcbn0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvdmFsdWVzLnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb252ZXJ0VG9SZWFsTnVtYmVyKFxuXHR2YWx1ZTogTnVtYmVyVmFsdWUgfCBudW1iZXIsXG4pOiBSZWFsTnVtYmVyVmFsdWUge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRkYXRhdHlwZTogJ3JlYWwnLFxuXHRcdFx0dmFsdWUsXG5cdFx0fVxuXHR9XG5cblx0aWYgKCh2YWx1ZSBhcyBOdW1iZXJWYWx1ZSkuZGF0YXR5cGUgPT09ICdmcmFjdGlvbicpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGF0YXR5cGU6ICdyZWFsJyxcblx0XHRcdHZhbHVlOlxuXHRcdFx0XHQodmFsdWUgYXMgRnJhY3Rpb25WYWx1ZSkudmFsdWUubnVtZXJhdG9yIC9cblx0XHRcdFx0KHZhbHVlIGFzIEZyYWN0aW9uVmFsdWUpLnZhbHVlLmRlbm9taW5hdG9yLFxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0ZGF0YXR5cGU6ICdyZWFsJyxcblx0XHR2YWx1ZTogKHZhbHVlIGFzIE5vbkZyYWN0aW9uVmFsdWUpLnZhbHVlLFxuXHR9XG59XG4iXX0=