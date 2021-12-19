export default function getReciprocal(value) {
    if (typeof value === 'number') {
        return {
            datatype: 'fraction',
            value: {
                denominator: value,
                numerator: 1,
            },
        };
    }
    if (value.datatype === 'fraction') {
        return {
            datatype: 'fraction',
            value: {
                denominator: value.value.numerator,
                numerator: value.value.denominator,
            },
        };
    }
    return {
        datatype: 'fraction',
        value: {
            denominator: value.value,
            numerator: 1,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sQ0FBQyxPQUFPLFVBQVUsYUFBYSxDQUNwQyxLQUEyQjtJQUUzQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM5QixPQUFPO1lBQ04sUUFBUSxFQUFFLFVBQVU7WUFDcEIsS0FBSyxFQUFFO2dCQUNOLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixTQUFTLEVBQUUsQ0FBQzthQUNaO1NBQ0QsQ0FBQTtLQUNEO0lBRUQsSUFBSyxLQUFxQixDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDbkQsT0FBTztZQUNOLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEtBQUssRUFBRTtnQkFDTixXQUFXLEVBQUcsS0FBdUIsQ0FBQyxLQUFLLENBQUMsU0FBUztnQkFDckQsU0FBUyxFQUFHLEtBQXVCLENBQUMsS0FBSyxDQUFDLFdBQVc7YUFDckQ7U0FDRCxDQUFBO0tBQ0Q7SUFFRCxPQUFPO1FBQ04sUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFO1lBQ04sV0FBVyxFQUFHLEtBQTBCLENBQUMsS0FBSztZQUM5QyxTQUFTLEVBQUUsQ0FBQztTQUNaO0tBQ0QsQ0FBQTtBQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRGcmFjdGlvblZhbHVlLFxuXHROb25GcmFjdGlvblZhbHVlLFxuXHROdW1iZXJWYWx1ZSxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvdmFsdWVzLnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRSZWNpcHJvY2FsKFxuXHR2YWx1ZTogTnVtYmVyVmFsdWUgfCBudW1iZXIsXG4pOiBOdW1iZXJWYWx1ZSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGF0eXBlOiAnZnJhY3Rpb24nLFxuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0ZGVub21pbmF0b3I6IHZhbHVlLFxuXHRcdFx0XHRudW1lcmF0b3I6IDEsXG5cdFx0XHR9LFxuXHRcdH1cblx0fVxuXG5cdGlmICgodmFsdWUgYXMgTnVtYmVyVmFsdWUpLmRhdGF0eXBlID09PSAnZnJhY3Rpb24nKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGF0eXBlOiAnZnJhY3Rpb24nLFxuXHRcdFx0dmFsdWU6IHtcblx0XHRcdFx0ZGVub21pbmF0b3I6ICh2YWx1ZSBhcyBGcmFjdGlvblZhbHVlKS52YWx1ZS5udW1lcmF0b3IsXG5cdFx0XHRcdG51bWVyYXRvcjogKHZhbHVlIGFzIEZyYWN0aW9uVmFsdWUpLnZhbHVlLmRlbm9taW5hdG9yLFxuXHRcdFx0fSxcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGRhdGF0eXBlOiAnZnJhY3Rpb24nLFxuXHRcdHZhbHVlOiB7XG5cdFx0XHRkZW5vbWluYXRvcjogKHZhbHVlIGFzIE5vbkZyYWN0aW9uVmFsdWUpLnZhbHVlLFxuXHRcdFx0bnVtZXJhdG9yOiAxLFxuXHRcdH0sXG5cdH1cbn1cbiJdfQ==