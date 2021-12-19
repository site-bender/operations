import afterAlphabetically from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.AFTER_ALPHABETICALLY,
    operand: 'bob',
};
Deno.test('[afterAlphabetically] returns correct validation if string comes after constraint value alphabetically', () => {
    const validation = {
        datatype: 'string',
        value: 'carol',
    };
    assertEquals(afterAlphabetically(constraint)(validation), validation);
});
Deno.test('[afterAlphabetically] handles constraint with options', () => {
    const validation = {
        datatype: 'string',
        value: 'carol',
    };
    assertEquals(afterAlphabetically({
        ...constraint,
        language: 'fr',
        options: {
            sensitivity: 'accent',
        },
    })(validation), validation);
});
Deno.test('[afterAlphabetically] returns error if validation fails', () => {
    const validation = {
        datatype: 'string',
        value: 'alice',
    };
    assertEquals(afterAlphabetically(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.AFTER_ALPHABETICALLY,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLG1CQUFtQixNQUFNLFVBQVUsQ0FBQTtBQUsxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUE7QUFFL0UsTUFBTSxVQUFVLEdBQWtDO0lBQ2pELGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxvQkFBb0I7SUFDckQsT0FBTyxFQUFFLEtBQUs7Q0FDZCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUix3R0FBd0csRUFDeEcsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3RFLENBQUMsQ0FDRCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyx1REFBdUQsRUFBRSxHQUFHLEVBQUU7SUFDdkUsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUNYLG1CQUFtQixDQUFDO1FBQ25CLEdBQUcsVUFBVTtRQUNiLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFO1lBQ1IsV0FBVyxFQUFFLFFBQVE7U0FDckI7S0FDRCxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQ2QsVUFBVSxDQUNWLENBQUE7QUFDRixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxJQUFJLENBQUMseURBQXlELEVBQUUsR0FBRyxFQUFFO0lBQ3pFLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxPQUFPO0tBQ2QsQ0FBQTtJQUVELFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN6RCxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxvQkFBb0I7YUFDNUM7U0FDRDtRQUNELFNBQVMsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWZ0ZXJBbHBoYWJldGljYWxseSBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdEFmdGVyQWxwaGFiZXRpY2FsbHlDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogQWZ0ZXJBbHBoYWJldGljYWxseUNvbnN0cmFpbnQgPSB7XG5cdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkFGVEVSX0FMUEhBQkVUSUNBTExZLFxuXHRvcGVyYW5kOiAnYm9iJyxcbn1cblxuRGVuby50ZXN0KFxuXHQnW2FmdGVyQWxwaGFiZXRpY2FsbHldIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIGlmIHN0cmluZyBjb21lcyBhZnRlciBjb25zdHJhaW50IHZhbHVlIGFscGhhYmV0aWNhbGx5Jyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdFx0XHR2YWx1ZTogJ2Nhcm9sJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMoYWZ0ZXJBbHBoYWJldGljYWxseShjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbYWZ0ZXJBbHBoYWJldGljYWxseV0gaGFuZGxlcyBjb25zdHJhaW50IHdpdGggb3B0aW9ucycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdFx0dmFsdWU6ICdjYXJvbCcsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoXG5cdFx0YWZ0ZXJBbHBoYWJldGljYWxseSh7XG5cdFx0XHQuLi5jb25zdHJhaW50LFxuXHRcdFx0bGFuZ3VhZ2U6ICdmcicsXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdHNlbnNpdGl2aXR5OiAnYWNjZW50Jyxcblx0XHRcdH0sXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KCdbYWZ0ZXJBbHBoYWJldGljYWxseV0gcmV0dXJucyBlcnJvciBpZiB2YWxpZGF0aW9uIGZhaWxzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc3RyaW5nJyxcblx0XHR2YWx1ZTogJ2FsaWNlJyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhhZnRlckFscGhhYmV0aWNhbGx5KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRlcnJvcnM6IFtcblx0XHRcdHtcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuQUZURVJfQUxQSEFCRVRJQ0FMTFksXG5cdFx0XHR9LFxuXHRcdF0sXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHR9KVxufSlcbiJdfQ==