import beforeAlphabetically from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.BEFORE_ALPHABETICALLY,
    operand: 'bob',
};
Deno.test('[beforeAlphabetically] returns correct validation if value validates against constraint', () => {
    const validation = {
        datatype: 'string',
        value: 'alice',
    };
    assertEquals(beforeAlphabetically(constraint)(validation), validation);
});
Deno.test('[beforeAlphabetically] handles constraint with options', () => {
    const validation = {
        datatype: 'string',
        value: 'alice',
    };
    assertEquals(beforeAlphabetically({
        ...constraint,
        language: 'fr',
        options: {
            sensitivity: 'accent',
        },
    })(validation), validation);
});
Deno.test('[beforeAlphabetically] returns error if validation fails', () => {
    const validation = {
        datatype: 'string',
        value: 'carol',
    };
    assertEquals(beforeAlphabetically(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.BEFORE_ALPHABETICALLY,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLG9CQUFvQixNQUFNLFVBQVUsQ0FBQTtBQUszQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUE7QUFFL0UsTUFBTSxVQUFVLEdBQW1DO0lBQ2xELGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxxQkFBcUI7SUFDdEQsT0FBTyxFQUFFLEtBQUs7Q0FDZCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUix5RkFBeUYsRUFDekYsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3ZFLENBQUMsQ0FDRCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7SUFDeEUsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUNYLG9CQUFvQixDQUFDO1FBQ3BCLEdBQUcsVUFBVTtRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFO1lBQ1IsV0FBVyxFQUFFLFFBQVE7U0FDckI7S0FDRCxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQ2QsVUFBVSxDQUNWLENBQUE7QUFDRixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsMERBQTBELEVBQUUsR0FBRyxFQUFFO0lBQzFFLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxPQUFPO0tBQ2QsQ0FBQTtJQUVELFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxRCxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxxQkFBcUI7YUFDN0M7U0FDRDtRQUNELFNBQVMsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmVmb3JlQWxwaGFiZXRpY2FsbHkgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQge1xuXHRCZWZvcmVBbHBoYWJldGljYWxseUNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBCZWZvcmVBbHBoYWJldGljYWxseUNvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkJFRk9SRV9BTFBIQUJFVElDQUxMWSxcblx0b3BlcmFuZDogJ2JvYicsXG59XG5cbkRlbm8udGVzdChcblx0J1tiZWZvcmVBbHBoYWJldGljYWxseV0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgdmFsdWUgdmFsaWRhdGVzIGFnYWluc3QgY29uc3RyYWludCcsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0dmFsdWU6ICdhbGljZScsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKGJlZm9yZUFscGhhYmV0aWNhbGx5KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1tiZWZvcmVBbHBoYWJldGljYWxseV0gaGFuZGxlcyBjb25zdHJhaW50IHdpdGggb3B0aW9ucycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdFx0dmFsdWU6ICdhbGljZScsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoXG5cdFx0YmVmb3JlQWxwaGFiZXRpY2FsbHkoe1xuXHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdGxhbmd1YWdlOiAnZnInLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRzZW5zaXRpdml0eTogJ2FjY2VudCcsXG5cdFx0XHR9LFxuXHRcdH0pKHZhbGlkYXRpb24pLFxuXHRcdHZhbGlkYXRpb24sXG5cdClcbn0pXG5cbkRlbm8udGVzdCgnW2JlZm9yZUFscGhhYmV0aWNhbGx5XSByZXR1cm5zIGVycm9yIGlmIHZhbGlkYXRpb24gZmFpbHMnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdzdHJpbmcnLFxuXHRcdHZhbHVlOiAnY2Fyb2wnLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKGJlZm9yZUFscGhhYmV0aWNhbGx5KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQkVGT1JFX0FMUEhBQkVUSUNBTExZLFxuXHRcdFx0fSxcblx0XHRdLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0fSlcbn0pXG4iXX0=