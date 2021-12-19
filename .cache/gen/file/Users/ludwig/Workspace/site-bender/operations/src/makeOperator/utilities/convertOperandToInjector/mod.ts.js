import { TypeOfTruncation } from './../../../types/enums.ts';
import makeOperator from '../../mod.ts';
import truncate from '../truncate/mod.ts';
export default function convertOperandToInjector(operand, decimalPlaces) {
    if (typeof operand === 'number') {
        return () => {
            if (typeof decimalPlaces === 'number') {
                return {
                    datatype: 'precision',
                    decimalPlaces,
                    value: truncate(Number(operand), TypeOfTruncation.ROUND, decimalPlaces),
                };
            }
            if (Number.isInteger(operand)) {
                return {
                    datatype: 'integer',
                    value: operand,
                };
            }
            return {
                datatype: 'real',
                value: Number(operand),
            };
        };
    }
    if (operand.operatorType) {
        return makeOperator(operand);
    }
    return () => operand;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBRzVELE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQTtBQUN2QyxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQTtBQUV6QyxNQUFNLENBQUMsT0FBTyxVQUFVLHdCQUF3QixDQUMvQyxPQUF5QyxFQUN6QyxhQUFzQjtJQUV0QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtRQUNoQyxPQUFPLEdBQUcsRUFBRTtZQUNYLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUN0QyxPQUFPO29CQUNOLFFBQVEsRUFBRSxXQUFXO29CQUNyQixhQUFhO29CQUNiLEtBQUssRUFBRSxRQUFRLENBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNmLGdCQUFnQixDQUFDLEtBQUssRUFDdEIsYUFBYSxDQUNIO2lCQUNYLENBQUE7YUFDRDtZQUVELElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDOUIsT0FBTztvQkFDTixRQUFRLEVBQUUsU0FBUztvQkFDbkIsS0FBSyxFQUFFLE9BQU87aUJBQ2QsQ0FBQTthQUNEO1lBRUQsT0FBTztnQkFDTixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDdEIsQ0FBQTtRQUNGLENBQUMsQ0FBQTtLQUNEO0lBRUQsSUFBSyxPQUFxQixDQUFDLFlBQVksRUFBRTtRQUN4QyxPQUFPLFlBQVksQ0FBQyxPQUFvQixDQUFDLENBQUE7S0FDekM7SUFFRCxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQXNCLENBQUE7QUFDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFR5cGVPZlRydW5jYXRpb24gfSBmcm9tICcuLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHR5cGUgeyBJbmplY3RvciwgT3BlcmF0aW9uIH0gZnJvbSAnLi8uLi8uLi8uLi90eXBlcy9vcGVyYXRpb25zLnRzJ1xuaW1wb3J0IHR5cGUgeyBOdW1iZXJWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCBtYWtlT3BlcmF0b3IgZnJvbSAnLi4vLi4vbW9kLnRzJ1xuaW1wb3J0IHRydW5jYXRlIGZyb20gJy4uL3RydW5jYXRlL21vZC50cydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udmVydE9wZXJhbmRUb0luamVjdG9yKFxuXHRvcGVyYW5kOiBudW1iZXIgfCBPcGVyYXRpb24gfCBOdW1iZXJWYWx1ZSxcblx0ZGVjaW1hbFBsYWNlcz86IG51bWJlcixcbik6IEluamVjdG9yIHtcblx0aWYgKHR5cGVvZiBvcGVyYW5kID09PSAnbnVtYmVyJykge1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIGRlY2ltYWxQbGFjZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZGF0YXR5cGU6ICdwcmVjaXNpb24nLFxuXHRcdFx0XHRcdGRlY2ltYWxQbGFjZXMsXG5cdFx0XHRcdFx0dmFsdWU6IHRydW5jYXRlKFxuXHRcdFx0XHRcdFx0TnVtYmVyKG9wZXJhbmQpLFxuXHRcdFx0XHRcdFx0VHlwZU9mVHJ1bmNhdGlvbi5ST1VORCxcblx0XHRcdFx0XHRcdGRlY2ltYWxQbGFjZXMsXG5cdFx0XHRcdFx0KSBhcyBudW1iZXIsXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKE51bWJlci5pc0ludGVnZXIob3BlcmFuZCkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRcdHZhbHVlOiBvcGVyYW5kLFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGRhdGF0eXBlOiAncmVhbCcsXG5cdFx0XHRcdHZhbHVlOiBOdW1iZXIob3BlcmFuZCksXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKChvcGVyYW5kIGFzIE9wZXJhdGlvbikub3BlcmF0b3JUeXBlKSB7XG5cdFx0cmV0dXJuIG1ha2VPcGVyYXRvcihvcGVyYW5kIGFzIE9wZXJhdGlvbilcblx0fVxuXG5cdHJldHVybiAoKSA9PiBvcGVyYW5kIGFzIE51bWJlclZhbHVlXG59XG4iXX0=