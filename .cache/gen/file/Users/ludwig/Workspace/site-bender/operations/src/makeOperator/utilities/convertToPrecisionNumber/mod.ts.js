import { TypeOfTruncation } from '../../../types/enums.ts';
import truncate from '../truncate/mod.ts';
export default function convertToPrecisionNumber(value, decimalPlaces = 0, truncationType = TypeOfTruncation.ROUND) {
    if (typeof value === 'number') {
        return {
            datatype: 'precision',
            decimalPlaces,
            value: truncate(value, truncationType, decimalPlaces),
        };
    }
    if (value.datatype === 'fraction') {
        return {
            datatype: 'precision',
            decimalPlaces,
            value: truncate(value.value.numerator /
                value.value.denominator, truncationType, decimalPlaces),
        };
    }
    return {
        datatype: 'precision',
        decimalPlaces,
        value: truncate(value.value, truncationType, decimalPlaces),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBTzFELE9BQU8sUUFBUSxNQUFNLG9CQUFvQixDQUFBO0FBRXpDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsd0JBQXdCLENBQy9DLEtBQTJCLEVBQzNCLGFBQWEsR0FBRyxDQUFDLEVBQ2pCLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLO0lBRXZDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU87WUFDTixRQUFRLEVBQUUsV0FBVztZQUNyQixhQUFhO1lBQ2IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBVztTQUMvRCxDQUFBO0tBQ0Q7SUFFRCxJQUFLLEtBQXFCLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUNuRCxPQUFPO1lBQ04sUUFBUSxFQUFFLFdBQVc7WUFDckIsYUFBYTtZQUNiLEtBQUssRUFBRSxRQUFRLENBQ2IsS0FBdUIsQ0FBQyxLQUFLLENBQUMsU0FBUztnQkFDdEMsS0FBdUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUMzQyxjQUFjLEVBQ2QsYUFBYSxDQUNIO1NBQ1gsQ0FBQTtLQUNEO0lBRUQsT0FBTztRQUNOLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLGFBQWE7UUFDYixLQUFLLEVBQUUsUUFBUSxDQUNiLEtBQTBCLENBQUMsS0FBSyxFQUNqQyxjQUFjLEVBQ2QsYUFBYSxDQUNIO0tBQ1gsQ0FBQTtBQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUeXBlT2ZUcnVuY2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvZW51bXMudHMnXG5pbXBvcnQge1xuXHRGcmFjdGlvblZhbHVlLFxuXHROb25GcmFjdGlvblZhbHVlLFxuXHROdW1iZXJWYWx1ZSxcblx0UHJlY2lzaW9uTnVtYmVyVmFsdWUsXG59IGZyb20gJy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCB0cnVuY2F0ZSBmcm9tICcuLi90cnVuY2F0ZS9tb2QudHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnRUb1ByZWNpc2lvbk51bWJlcihcblx0dmFsdWU6IE51bWJlclZhbHVlIHwgbnVtYmVyLFxuXHRkZWNpbWFsUGxhY2VzID0gMCxcblx0dHJ1bmNhdGlvblR5cGUgPSBUeXBlT2ZUcnVuY2F0aW9uLlJPVU5ELFxuKTogUHJlY2lzaW9uTnVtYmVyVmFsdWUge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRkYXRhdHlwZTogJ3ByZWNpc2lvbicsXG5cdFx0XHRkZWNpbWFsUGxhY2VzLFxuXHRcdFx0dmFsdWU6IHRydW5jYXRlKHZhbHVlLCB0cnVuY2F0aW9uVHlwZSwgZGVjaW1hbFBsYWNlcykgYXMgbnVtYmVyLFxuXHRcdH1cblx0fVxuXG5cdGlmICgodmFsdWUgYXMgTnVtYmVyVmFsdWUpLmRhdGF0eXBlID09PSAnZnJhY3Rpb24nKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGRhdGF0eXBlOiAncHJlY2lzaW9uJyxcblx0XHRcdGRlY2ltYWxQbGFjZXMsXG5cdFx0XHR2YWx1ZTogdHJ1bmNhdGUoXG5cdFx0XHRcdCh2YWx1ZSBhcyBGcmFjdGlvblZhbHVlKS52YWx1ZS5udW1lcmF0b3IgL1xuXHRcdFx0XHRcdCh2YWx1ZSBhcyBGcmFjdGlvblZhbHVlKS52YWx1ZS5kZW5vbWluYXRvcixcblx0XHRcdFx0dHJ1bmNhdGlvblR5cGUsXG5cdFx0XHRcdGRlY2ltYWxQbGFjZXMsXG5cdFx0XHQpIGFzIG51bWJlcixcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGRhdGF0eXBlOiAncHJlY2lzaW9uJyxcblx0XHRkZWNpbWFsUGxhY2VzLFxuXHRcdHZhbHVlOiB0cnVuY2F0ZShcblx0XHRcdCh2YWx1ZSBhcyBOb25GcmFjdGlvblZhbHVlKS52YWx1ZSxcblx0XHRcdHRydW5jYXRpb25UeXBlLFxuXHRcdFx0ZGVjaW1hbFBsYWNlcyxcblx0XHQpIGFzIG51bWJlcixcblx0fVxufVxuIl19