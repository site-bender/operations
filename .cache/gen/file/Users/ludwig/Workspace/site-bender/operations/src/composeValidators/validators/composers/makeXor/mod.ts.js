import composeValidators from '../../../mod.ts';
import pipe from '../../../../utilities/pipe/mod.ts';
import ListFormat from 'https://cdn.skypack.dev/@formatjs/intl-listformat?dts';
const xorFormatter = new ListFormat('en', {
    style: 'long',
    type: 'unit',
});
export default function makeXor(constraint) {
    const { tests } = constraint;
    const validators = tests.map((test) => composeValidators(test));
    const validateXor = pipe(validators);
    return function xor(validation) {
        const validated = validateXor(validation);
        const { xors, others } = (validated.errors || []).reduce((acc, error) => error.error === 'XOR_ERROR'
            ? { ...acc, xors: [...acc.xors, error] }
            : { ...acc, others: [...acc.others, error] }, { xors: [], others: [] });
        return validated.errors?.length === constraint.tests.length - 1
            ? validation
            : {
                ...validation,
                isInvalid: true,
                errors: [
                    ...xors,
                    {
                        constraint,
                        error: 'XOR_ERROR',
                        errors: others,
                        errorMessage: xorFormatter.format(others
                            .map(({ errorMessage }) => errorMessage)
                            .filter(value => value)),
                    },
                ],
            };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8saUJBQWlCLE1BQU0saUJBQWlCLENBQUE7QUFPL0MsT0FBTyxJQUFJLE1BQU0sbUNBQW1DLENBQUE7QUFDcEQsT0FBTyxVQUFVLE1BQU0sdURBQXVELENBQUE7QUFFOUUsTUFBTSxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO0lBQ3pDLEtBQUssRUFBRSxNQUFNO0lBQ2IsSUFBSSxFQUFFLE1BQU07Q0FDWixDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FDOUIsVUFBeUI7SUFFekIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQTtJQUM1QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUMzQixDQUFDLElBQWdCLEVBQTRDLEVBQUUsQ0FDOUQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQ3hCLENBQUE7SUFDRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUEyQyxDQUFBO0lBRTlFLE9BQU8sU0FBUyxHQUFHLENBQUMsVUFBc0I7UUFDekMsTUFBTSxTQUFTLEdBQWUsV0FBVyxDQUFDLFVBQVUsQ0FBZSxDQUFBO1FBRW5FLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQWdCLENBQ3JDLFNBQVMsQ0FBQyxNQUFNLElBQUssRUFBNkIsQ0FDbEQsQ0FBQyxNQUFNLENBQ1AsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDZCxLQUFLLENBQUMsS0FBSyxLQUFLLFdBQVc7WUFDMUIsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUM5QyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBaUIsQ0FDdkMsQ0FBQTtRQUVELE9BQU8sU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEtBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUM5RCxDQUFDLENBQUMsVUFBVTtZQUNaLENBQUMsQ0FBQztnQkFDQSxHQUFHLFVBQVU7Z0JBQ2IsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsTUFBTSxFQUFFO29CQUNQLEdBQUcsSUFBSTtvQkFDUDt3QkFDQyxVQUFVO3dCQUNWLEtBQUssRUFBRSxXQUFXO3dCQUNsQixNQUFNLEVBQUUsTUFBTTt3QkFDZCxZQUFZLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FDaEMsTUFBTTs2QkFDSixHQUFHLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUM7NkJBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBa0IsQ0FDekM7cUJBQ2tCO2lCQUNwQjthQUNBLENBQUE7SUFDTCxDQUFDLENBQUE7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbXBvc2VWYWxpZGF0b3JzIGZyb20gJy4uLy4uLy4uL21vZC50cydcbmltcG9ydCB0eXBlIHtcblx0Q29uc3RyYWludCxcblx0VmFsaWRhdGlvbixcblx0VmFsaWRhdGlvbkVycm9yLFxuXHRYb3JDb25zdHJhaW50LFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCBwaXBlIGZyb20gJy4uLy4uLy4uLy4uL3V0aWxpdGllcy9waXBlL21vZC50cydcbmltcG9ydCBMaXN0Rm9ybWF0IGZyb20gJ2h0dHBzOi8vY2RuLnNreXBhY2suZGV2L0Bmb3JtYXRqcy9pbnRsLWxpc3Rmb3JtYXQ/ZHRzJ1xuXG5jb25zdCB4b3JGb3JtYXR0ZXIgPSBuZXcgTGlzdEZvcm1hdCgnZW4nLCB7XG5cdHN0eWxlOiAnbG9uZycsXG5cdHR5cGU6ICd1bml0Jyxcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VYb3IoXG5cdGNvbnN0cmFpbnQ6IFhvckNvbnN0cmFpbnQsXG4pOiAodmFsaWRhdGlvbjogVmFsaWRhdGlvbikgPT4gVmFsaWRhdGlvbiB7XG5cdGNvbnN0IHsgdGVzdHMgfSA9IGNvbnN0cmFpbnRcblx0Y29uc3QgdmFsaWRhdG9ycyA9IHRlc3RzLm1hcChcblx0XHQodGVzdDogQ29uc3RyYWludCk6ICgodmFsaWRhdGlvbjogVmFsaWRhdGlvbikgPT4gVmFsaWRhdGlvbikgPT5cblx0XHRcdGNvbXBvc2VWYWxpZGF0b3JzKHRlc3QpLFxuXHQpXG5cdGNvbnN0IHZhbGlkYXRlWG9yID0gcGlwZSh2YWxpZGF0b3JzKSBhcyAodmFsaWRhdGlvbjogVmFsaWRhdGlvbikgPT4gVmFsaWRhdGlvblxuXG5cdHJldHVybiBmdW5jdGlvbiB4b3IodmFsaWRhdGlvbjogVmFsaWRhdGlvbik6IFZhbGlkYXRpb24ge1xuXHRcdGNvbnN0IHZhbGlkYXRlZDogVmFsaWRhdGlvbiA9IHZhbGlkYXRlWG9yKHZhbGlkYXRpb24pIGFzIFZhbGlkYXRpb25cblxuXHRcdGNvbnN0IHsgeG9ycywgb3RoZXJzIH06IFhvclNwbGl0dGVyID0gKFxuXHRcdFx0dmFsaWRhdGVkLmVycm9ycyB8fCAoW10gYXMgQXJyYXk8VmFsaWRhdGlvbkVycm9yPilcblx0XHQpLnJlZHVjZShcblx0XHRcdChhY2MsIGVycm9yKSA9PlxuXHRcdFx0XHRlcnJvci5lcnJvciA9PT0gJ1hPUl9FUlJPUidcblx0XHRcdFx0XHQ/IHsgLi4uYWNjLCB4b3JzOiBbLi4uYWNjLnhvcnMsIGVycm9yXSB9XG5cdFx0XHRcdFx0OiB7IC4uLmFjYywgb3RoZXJzOiBbLi4uYWNjLm90aGVycywgZXJyb3JdIH0sXG5cdFx0XHR7IHhvcnM6IFtdLCBvdGhlcnM6IFtdIH0gYXMgWG9yU3BsaXR0ZXIsXG5cdFx0KVxuXG5cdFx0cmV0dXJuIHZhbGlkYXRlZC5lcnJvcnM/Lmxlbmd0aCA9PT0gY29uc3RyYWludC50ZXN0cy5sZW5ndGggLSAxXG5cdFx0XHQ/IHZhbGlkYXRpb25cblx0XHRcdDoge1xuXHRcdFx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdFx0XHRcdGVycm9yczogW1xuXHRcdFx0XHRcdFx0Li4ueG9ycyxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0XHRcdFx0ZXJyb3I6ICdYT1JfRVJST1InLFxuXHRcdFx0XHRcdFx0XHRlcnJvcnM6IG90aGVycyxcblx0XHRcdFx0XHRcdFx0ZXJyb3JNZXNzYWdlOiB4b3JGb3JtYXR0ZXIuZm9ybWF0KFxuXHRcdFx0XHRcdFx0XHRcdG90aGVyc1xuXHRcdFx0XHRcdFx0XHRcdFx0Lm1hcCgoeyBlcnJvck1lc3NhZ2UgfSkgPT4gZXJyb3JNZXNzYWdlKVxuXHRcdFx0XHRcdFx0XHRcdFx0LmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSkgYXMgQXJyYXk8c3RyaW5nPixcblx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdH0gYXMgVmFsaWRhdGlvbkVycm9yLFxuXHRcdFx0XHRcdF0sXG5cdFx0XHQgIH1cblx0fVxufVxuXG50eXBlIFhvclNwbGl0dGVyID0ge1xuXHR4b3JzOiBBcnJheTxWYWxpZGF0aW9uRXJyb3I+XG5cdG90aGVyczogQXJyYXk8VmFsaWRhdGlvbkVycm9yPlxufVxuIl19