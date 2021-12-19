import makeError from '../../../utilities/makeError/mod.ts';
import stringToMap from '../../../utilities/stringToMap/mod.ts';
export default function makeIsMap(constraint) {
    return function isMap(validation) {
        const { keyValueSeparator, separator, value } = validation;
        try {
            typeof value === 'string'
                ? stringToMap(value, separator, keyValueSeparator)
                : 'entries' in value
                    ? value
                    : new Map(Object.entries(value));
            return validation;
        }
        catch (e) {
            return makeError(validation, constraint, e.toString());
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFBO0FBQzNELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFBO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUNoQyxVQUE2QjtJQUU3QixPQUFPLFNBQVMsS0FBSyxDQUFDLFVBQXNCO1FBQzNDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBc0IsQ0FBQTtRQUV0RSxJQUFJO1lBQ0gsT0FBTyxLQUFLLEtBQUssUUFBUTtnQkFDeEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixDQUFDO2dCQUNsRCxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUs7b0JBQ3BCLENBQUMsQ0FBQyxLQUFLO29CQUNQLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFFakMsT0FBTyxVQUFVLENBQUE7U0FDakI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNYLE9BQU8sU0FBUyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUcsQ0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7U0FDakU7SUFDRixDQUFDLENBQUE7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge1xuXHRNYXBUeXBlQ29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvY29uc3RyYWludHMudHMnXG5pbXBvcnQgdHlwZSB7IE1hcFZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvdmFsdWVzLnRzJ1xuaW1wb3J0IG1ha2VFcnJvciBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvbWFrZUVycm9yL21vZC50cydcbmltcG9ydCBzdHJpbmdUb01hcCBmcm9tICcuLi8uLi8uLi91dGlsaXRpZXMvc3RyaW5nVG9NYXAvbW9kLnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlSXNNYXAoXG5cdGNvbnN0cmFpbnQ6IE1hcFR5cGVDb25zdHJhaW50LFxuKTogKHZhbGlkYXRpb246IFZhbGlkYXRpb24pID0+IFZhbGlkYXRpb24ge1xuXHRyZXR1cm4gZnVuY3Rpb24gaXNNYXAodmFsaWRhdGlvbjogVmFsaWRhdGlvbik6IFZhbGlkYXRpb24ge1xuXHRcdGNvbnN0IHsga2V5VmFsdWVTZXBhcmF0b3IsIHNlcGFyYXRvciwgdmFsdWUgfSA9IHZhbGlkYXRpb24gYXMgTWFwVmFsdWVcblxuXHRcdHRyeSB7XG5cdFx0XHR0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG5cdFx0XHRcdD8gc3RyaW5nVG9NYXAodmFsdWUsIHNlcGFyYXRvciwga2V5VmFsdWVTZXBhcmF0b3IpXG5cdFx0XHRcdDogJ2VudHJpZXMnIGluIHZhbHVlXG5cdFx0XHRcdD8gdmFsdWVcblx0XHRcdFx0OiBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHZhbHVlKSlcblxuXHRcdFx0cmV0dXJuIHZhbGlkYXRpb25cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gbWFrZUVycm9yKHZhbGlkYXRpb24sIGNvbnN0cmFpbnQsIChlIGFzIEVycm9yKS50b1N0cmluZygpKVxuXHRcdH1cblx0fVxufVxuIl19