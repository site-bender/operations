import member from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.MEMBER,
    operand: ['red', 'green', 'blue'],
};
Deno.test('[member] returns correct validation when value is a member of constraint set', () => {
    const validation = {
        datatype: 'member',
        value: 'green',
    };
    assertEquals(member(constraint)(validation), validation);
});
Deno.test('[member] works when constraint set is a string', () => {
    const validation = {
        datatype: 'member',
        value: 'green',
    };
    assertEquals(member({
        ...constraint,
        operand: 'red,green,blue',
    })(validation), validation);
});
Deno.test('[member] works when constraint set is a Set', () => {
    const validation = {
        datatype: 'member',
        value: 'green',
    };
    assertEquals(member({
        ...constraint,
        operand: new Set(['red', 'green', 'blue']),
    })(validation), validation);
});
Deno.test('[disjointSet] returns error if value is not a member of the constraint set', () => {
    const validation = {
        datatype: 'member',
        value: 'orange',
    };
    assertEquals(member(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.MEMBER,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUE7QUFLN0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUFxQjtJQUNwQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTtJQUN2QyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztDQUNqQyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUiw4RUFBOEUsRUFDOUUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUN6RCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0RBQWdELEVBQUUsR0FBRyxFQUFFO0lBQ2hFLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxPQUFPO0tBQ2QsQ0FBQTtJQUVELFlBQVksQ0FDWCxNQUFNLENBQUM7UUFDTixHQUFHLFVBQVU7UUFDYixPQUFPLEVBQUUsZ0JBQWdCO0tBQ3pCLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyw2Q0FBNkMsRUFBRSxHQUFHLEVBQUU7SUFDN0QsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsWUFBWSxDQUNYLE1BQU0sQ0FBQztRQUNOLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDMUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkLFVBQVUsQ0FDVixDQUFBO0FBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxDQUNSLDRFQUE0RSxFQUM1RSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsUUFBUTtLQUNmLENBQUE7SUFFRCxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzVDLEdBQUcsVUFBVTtRQUNiLE1BQU0sRUFBRTtZQUNQO2dCQUNDLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLE1BQU07YUFDOUI7U0FDRDtRQUNELFNBQVMsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWVtYmVyIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHR5cGUge1xuXHRNZW1iZXJDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogTWVtYmVyQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRvcGVyYW5kOiBbJ3JlZCcsICdncmVlbicsICdibHVlJ10sXG59XG5cbkRlbm8udGVzdChcblx0J1ttZW1iZXJdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdoZW4gdmFsdWUgaXMgYSBtZW1iZXIgb2YgY29uc3RyYWludCBzZXQnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnbWVtYmVyJyxcblx0XHRcdHZhbHVlOiAnZ3JlZW4nLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhtZW1iZXIoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdCgnW21lbWJlcl0gd29ya3Mgd2hlbiBjb25zdHJhaW50IHNldCBpcyBhIHN0cmluZycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ21lbWJlcicsXG5cdFx0dmFsdWU6ICdncmVlbicsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoXG5cdFx0bWVtYmVyKHtcblx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRvcGVyYW5kOiAncmVkLGdyZWVuLGJsdWUnLFxuXHRcdH0pKHZhbGlkYXRpb24pLFxuXHRcdHZhbGlkYXRpb24sXG5cdClcbn0pXG5cbkRlbm8udGVzdCgnW21lbWJlcl0gd29ya3Mgd2hlbiBjb25zdHJhaW50IHNldCBpcyBhIFNldCcsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ21lbWJlcicsXG5cdFx0dmFsdWU6ICdncmVlbicsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMoXG5cdFx0bWVtYmVyKHtcblx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRvcGVyYW5kOiBuZXcgU2V0KFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnXSksXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KFxuXHQnW2Rpc2pvaW50U2V0XSByZXR1cm5zIGVycm9yIGlmIHZhbHVlIGlzIG5vdCBhIG1lbWJlciBvZiB0aGUgY29uc3RyYWludCBzZXQnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnbWVtYmVyJyxcblx0XHRcdHZhbHVlOiAnb3JhbmdlJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobWVtYmVyKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdFx0ZXJyb3JzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdHJhaW50LFxuXHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0fSlcblx0fSxcbilcbiJdfQ==