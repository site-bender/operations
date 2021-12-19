import makeIsMember from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_MEMBER,
};
Deno.test('[makeIsMember] returns correct validation when value is a potential member', () => {
    const validation = {
        datatype: 'member',
        value: true,
    };
    assertEquals(makeIsMember(constraint)(validation), validation);
});
Deno.test('[makeIsMember] returns error when value is not a potential member (undefined)', () => {
    const validation = {
        datatype: 'member',
        value: undefined,
    };
    assertEquals(makeIsMember(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_MEMBER,
                constraint,
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSxVQUFVLENBQUE7QUFLbkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF5QjtJQUN4QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsU0FBUztDQUMxQyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiw0RUFBNEUsRUFDNUUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLElBQUk7S0FDWCxDQUFBO0lBRUQsWUFBWSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUMvRCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1IsK0VBQStFLEVBQy9FLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxTQUFTO0tBQ2hCLENBQUE7SUFFRCxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2xELEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFNBQVM7Z0JBQ2pDLFVBQVU7YUFDVjtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZUlzTWVtYmVyIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0TWVtYmVyVHlwZUNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBNZW1iZXJUeXBlQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuSVNfTUVNQkVSLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzTWVtYmVyXSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aGVuIHZhbHVlIGlzIGEgcG90ZW50aWFsIG1lbWJlcicsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdtZW1iZXInLFxuXHRcdFx0dmFsdWU6IHRydWUsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc01lbWJlcihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KFxuXHQnW21ha2VJc01lbWJlcl0gcmV0dXJucyBlcnJvciB3aGVuIHZhbHVlIGlzIG5vdCBhIHBvdGVudGlhbCBtZW1iZXIgKHVuZGVmaW5lZCknLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnbWVtYmVyJyxcblx0XHRcdHZhbHVlOiB1bmRlZmluZWQsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc01lbWJlcihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdFx0Li4udmFsaWRhdGlvbixcblx0XHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHRcdGVycm9yczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuSVNfTUVNQkVSLFxuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0pXG5cdH0sXG4pXG4iXX0=