import makeIsArray from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_ARRAY,
    datatype: 'array',
};
Deno.test('[makeIsArray] returns correct validation when value is an array', () => {
    const validation = {
        datatype: 'array',
        value: [],
    };
    assertEquals(makeIsArray(constraint)(validation), validation);
});
Deno.test('[makeIsArray] returns error when value is not an array', () => {
    const validation = {
        datatype: 'array',
        value: '',
    };
    assertEquals(makeIsArray(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_ARRAY,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxVQUFVLENBQUE7QUFLbEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF3QjtJQUN2QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTtJQUN6QyxRQUFRLEVBQUUsT0FBTztDQUNqQixDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixpRUFBaUUsRUFDakUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLE9BQU87UUFDakIsS0FBSyxFQUFFLEVBQUU7S0FDVCxDQUFBO0lBRUQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUM5RCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsd0RBQXdELEVBQUUsR0FBRyxFQUFFO0lBQ3hFLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLEtBQUssRUFBRSxFQUFFO0tBQ1QsQ0FBQTtJQUVELFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakQsR0FBRyxVQUFVO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUU7WUFDUDtnQkFDQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsUUFBUTtnQkFDaEMsVUFBVTthQUNWO1NBQ0Q7S0FDRCxDQUFDLENBQUE7QUFDSCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYWtlSXNBcnJheSBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdEFycmF5VHlwZUNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBBcnJheVR5cGVDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5JU19BUlJBWSxcblx0ZGF0YXR5cGU6ICdhcnJheScsXG59XG5cbkRlbm8udGVzdChcblx0J1ttYWtlSXNBcnJheV0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gd2hlbiB2YWx1ZSBpcyBhbiBhcnJheScsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdhcnJheScsXG5cdFx0XHR2YWx1ZTogW10sXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc0FycmF5KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoJ1ttYWtlSXNBcnJheV0gcmV0dXJucyBlcnJvciB3aGVuIHZhbHVlIGlzIG5vdCBhbiBhcnJheScsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ2FycmF5Jyxcblx0XHR2YWx1ZTogJycsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMobWFrZUlzQXJyYXkoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuSVNfQVJSQVksXG5cdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuIl19