import overlappingSet from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.OVERLAPPING_SET,
    operand: 'red,blue,green',
};
Deno.test('[overlappingSet] returns correct validation if value set and constraint set share some but not all members', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,red,yellow,blue',
    };
    assertEquals(overlappingSet(constraint)(validation), validation);
});
Deno.test('[overlappingSet] returns correct validation with arrays', () => {
    const validation = {
        datatype: 'set',
        value: ['cyan', 'red', 'yellow', 'black'],
    };
    assertEquals(overlappingSet({
        ...constraint,
        operand: ['red', 'green', 'blue'],
    })(validation), validation);
});
Deno.test('[overlappingSet] returns correct validation with sets', () => {
    const validation = {
        datatype: 'set',
        value: new Set(['cyan', 'magenta', 'yellow', 'blue']),
    };
    assertEquals(overlappingSet({
        ...constraint,
        operand: new Set(['red', 'green', 'blue']),
    })(validation), validation);
});
Deno.test('[overlappingSet] returns error if value set and constraint set share no members', () => {
    const validation = {
        datatype: 'set',
        value: 'cyan,magenta,yellow,black',
    };
    assertEquals(overlappingSet(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.OVERLAPPING_SET,
            },
        ],
        isInvalid: true,
    });
});
Deno.test('[overlappingSet] returns error if value set and constraint set share all members', () => {
    const validation = {
        datatype: 'set',
        value: 'red,blue,green',
    };
    assertEquals(overlappingSet(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.OVERLAPPING_SET,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWMsTUFBTSxVQUFVLENBQUE7QUFLckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUE2QjtJQUM1QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsZUFBZTtJQUNoRCxPQUFPLEVBQUUsZ0JBQWdCO0NBQ3pCLENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLDRHQUE0RyxFQUM1RyxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxzQkFBc0I7S0FDN0IsQ0FBQTtJQUVELFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDakUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtJQUN6RSxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQztLQUN6QyxDQUFBO0lBRUQsWUFBWSxDQUNYLGNBQWMsQ0FBQztRQUNkLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQ2pDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFDZCxVQUFVLENBQ1YsQ0FBQTtBQUNGLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyx1REFBdUQsRUFBRSxHQUFHLEVBQUU7SUFDdkUsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNyRCxDQUFBO0lBRUQsWUFBWSxDQUNYLGNBQWMsQ0FBQztRQUNkLEdBQUcsVUFBVTtRQUNiLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDMUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkLFVBQVUsQ0FDVixDQUFBO0FBQ0YsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxDQUNSLGlGQUFpRixFQUNqRixHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSwyQkFBMkI7S0FDbEMsQ0FBQTtJQUVELFlBQVksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDcEQsR0FBRyxVQUFVO1FBQ2IsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsZUFBZTthQUN2QztTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1Isa0ZBQWtGLEVBQ2xGLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFlO1FBQzlCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsS0FBSyxFQUFFLGdCQUFnQjtLQUN2QixDQUFBO0lBRUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwRCxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxlQUFlO2FBQ3ZDO1NBQ0Q7UUFDRCxTQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG92ZXJsYXBwaW5nU2V0IGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0T3ZlcmxhcHBpbmdTZXRDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogT3ZlcmxhcHBpbmdTZXRDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5PVkVSTEFQUElOR19TRVQsXG5cdG9wZXJhbmQ6ICdyZWQsYmx1ZSxncmVlbicsXG59XG5cbkRlbm8udGVzdChcblx0J1tvdmVybGFwcGluZ1NldF0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gaWYgdmFsdWUgc2V0IGFuZCBjb25zdHJhaW50IHNldCBzaGFyZSBzb21lIGJ1dCBub3QgYWxsIG1lbWJlcnMnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHRcdHZhbHVlOiAnY3lhbixyZWQseWVsbG93LGJsdWUnLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhvdmVybGFwcGluZ1NldChjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbb3ZlcmxhcHBpbmdTZXRdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdpdGggYXJyYXlzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHR2YWx1ZTogWydjeWFuJywgJ3JlZCcsICd5ZWxsb3cnLCAnYmxhY2snXSxcblx0fVxuXG5cdGFzc2VydEVxdWFscyhcblx0XHRvdmVybGFwcGluZ1NldCh7XG5cdFx0XHQuLi5jb25zdHJhaW50LFxuXHRcdFx0b3BlcmFuZDogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddLFxuXHRcdH0pKHZhbGlkYXRpb24pLFxuXHRcdHZhbGlkYXRpb24sXG5cdClcbn0pXG5cbkRlbm8udGVzdCgnW292ZXJsYXBwaW5nU2V0XSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aXRoIHNldHMnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdHZhbHVlOiBuZXcgU2V0KFsnY3lhbicsICdtYWdlbnRhJywgJ3llbGxvdycsICdibHVlJ10pLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKFxuXHRcdG92ZXJsYXBwaW5nU2V0KHtcblx0XHRcdC4uLmNvbnN0cmFpbnQsXG5cdFx0XHRvcGVyYW5kOiBuZXcgU2V0KFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnXSksXG5cdFx0fSkodmFsaWRhdGlvbiksXG5cdFx0dmFsaWRhdGlvbixcblx0KVxufSlcblxuRGVuby50ZXN0KFxuXHQnW292ZXJsYXBwaW5nU2V0XSByZXR1cm5zIGVycm9yIGlmIHZhbHVlIHNldCBhbmQgY29uc3RyYWludCBzZXQgc2hhcmUgbm8gbWVtYmVycycsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdFx0dmFsdWU6ICdjeWFuLG1hZ2VudGEseWVsbG93LGJsYWNrJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMob3ZlcmxhcHBpbmdTZXQoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuT1ZFUkxBUFBJTkdfU0VULFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGlzSW52YWxpZDogdHJ1ZSxcblx0XHR9KVxuXHR9LFxuKVxuXG5EZW5vLnRlc3QoXG5cdCdbb3ZlcmxhcHBpbmdTZXRdIHJldHVybnMgZXJyb3IgaWYgdmFsdWUgc2V0IGFuZCBjb25zdHJhaW50IHNldCBzaGFyZSBhbGwgbWVtYmVycycsXG5cdCgpID0+IHtcblx0XHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdFx0dmFsdWU6ICdyZWQsYmx1ZSxncmVlbicsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG92ZXJsYXBwaW5nU2V0KGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdFx0ZXJyb3JzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjb25zdHJhaW50LFxuXHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50Lk9WRVJMQVBQSU5HX1NFVCxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0fSlcblx0fSxcbilcbiJdfQ==