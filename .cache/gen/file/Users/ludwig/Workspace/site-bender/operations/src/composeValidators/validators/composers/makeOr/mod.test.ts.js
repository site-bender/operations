import or from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.OR,
    tests: [
        {
            constraintType: TypeOfConstraint.MEMBER,
            operand: ['red', 'green', 'blue'],
        },
        {
            constraintType: TypeOfConstraint.MEMBER,
            operand: ['cyan', 'magenta', 'yellow', 'blue'],
        },
    ],
};
const validate = or(constraint);
Deno.test('[or] passes when both or either constraint check passes', () => {
    const validation = {
        datatype: 'member',
        value: 'blue',
    };
    assertEquals(validate(validation), validation);
    const validation2 = {
        datatype: 'member',
        value: 'red',
    };
    assertEquals(validate(validation2), validation2);
    const validation3 = {
        datatype: 'member',
        value: 'yellow',
    };
    assertEquals(validate(validation3), validation3);
});
Deno.test('[or] fails when both constraint checks fail', () => {
    const validation = {
        datatype: 'member',
        value: 'orange',
    };
    assertEquals(validate(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                constraint: {
                    constraintType: TypeOfConstraint.OR,
                    tests: [
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            datatype: 'set',
                            value: ['red', 'green', 'blue'],
                        },
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            datatype: 'set',
                            value: ['cyan', 'magenta', 'yellow', 'blue'],
                        },
                    ],
                },
                error: TypeOfConstraint.OR,
                errors: [
                    {
                        error: TypeOfConstraint.MEMBER,
                        constraint: {
                            constraintType: TypeOfConstraint.MEMBER,
                            datatype: 'set',
                            value: ['red', 'green', 'blue'],
                        },
                    },
                    {
                        error: TypeOfConstraint.MEMBER,
                        constraint: {
                            constraintType: TypeOfConstraint.MEMBER,
                            datatype: 'set',
                            value: ['cyan', 'magenta', 'yellow', 'blue'],
                        },
                    },
                ],
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFekIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUFpQjtJQUNoQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTtJQUNuQyxLQUFLLEVBQUU7UUFDTjtZQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO1lBQ3ZDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO1NBQ2pDO1FBQ0Q7WUFDQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTtZQUN2QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7U0FDOUM7S0FDRDtDQUNELENBQUE7QUFFRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyx5REFBeUQsRUFBRSxHQUFHLEVBQUU7SUFDekUsTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsS0FBSyxFQUFFLE1BQU07S0FDYixDQUFBO0lBRUQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUU5QyxNQUFNLFdBQVcsR0FBZTtRQUMvQixRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsS0FBSztLQUNaLENBQUE7SUFFRCxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBRWhELE1BQU0sV0FBVyxHQUFlO1FBQy9CLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEtBQUssRUFBRSxRQUFRO0tBQ2YsQ0FBQTtJQUVELFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDakQsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxFQUFFLEdBQUcsRUFBRTtJQUM3RCxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsUUFBUTtLQUNmLENBQUE7SUFFRCxZQUFZLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2xDLEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVSxFQUFFO29CQUNYLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFO29CQUNuQyxLQUFLLEVBQUU7d0JBQ047NEJBQ0MsY0FBYyxFQUFFLGdCQUFnQixDQUFDLE1BQU07NEJBQ3ZDLFFBQVEsRUFBRSxLQUFLOzRCQUNmLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO3lCQUMvQjt3QkFDRDs0QkFDQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTs0QkFDdkMsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUM1QztxQkFDRDtpQkFDRDtnQkFDRCxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxFQUFFO29CQUNQO3dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO3dCQUM5QixVQUFVLEVBQUU7NEJBQ1gsY0FBYyxFQUFFLGdCQUFnQixDQUFDLE1BQU07NEJBQ3ZDLFFBQVEsRUFBRSxLQUFLOzRCQUNmLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO3lCQUMvQjtxQkFDRDtvQkFDRDt3QkFDQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTt3QkFDOUIsVUFBVSxFQUFFOzRCQUNYLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNOzRCQUN2QyxRQUFRLEVBQUUsS0FBSzs0QkFDZixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7eUJBQzVDO3FCQUNEO2lCQUNEO2FBQ0Q7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9yIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHR5cGUgeyBPckNvbnN0cmFpbnQsIFZhbGlkYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogT3JDb25zdHJhaW50ID0ge1xuXHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5PUixcblx0dGVzdHM6IFtcblx0XHR7XG5cdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRvcGVyYW5kOiBbJ3JlZCcsICdncmVlbicsICdibHVlJ10sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRvcGVyYW5kOiBbJ2N5YW4nLCAnbWFnZW50YScsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHRcdH0sXG5cdF0sXG59XG5cbmNvbnN0IHZhbGlkYXRlID0gb3IoY29uc3RyYWludClcblxuRGVuby50ZXN0KCdbb3JdIHBhc3NlcyB3aGVuIGJvdGggb3IgZWl0aGVyIGNvbnN0cmFpbnQgY2hlY2sgcGFzc2VzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnbWVtYmVyJyxcblx0XHR2YWx1ZTogJ2JsdWUnLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKHZhbGlkYXRlKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxuXG5cdGNvbnN0IHZhbGlkYXRpb24yOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnbWVtYmVyJyxcblx0XHR2YWx1ZTogJ3JlZCcsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHModmFsaWRhdGUodmFsaWRhdGlvbjIpLCB2YWxpZGF0aW9uMilcblxuXHRjb25zdCB2YWxpZGF0aW9uMzogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ21lbWJlcicsXG5cdFx0dmFsdWU6ICd5ZWxsb3cnLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKHZhbGlkYXRlKHZhbGlkYXRpb24zKSwgdmFsaWRhdGlvbjMpXG59KVxuXG5EZW5vLnRlc3QoJ1tvcl0gZmFpbHMgd2hlbiBib3RoIGNvbnN0cmFpbnQgY2hlY2tzIGZhaWwnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdtZW1iZXInLFxuXHRcdHZhbHVlOiAnb3JhbmdlJyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyh2YWxpZGF0ZSh2YWxpZGF0aW9uKSwge1xuXHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdGVycm9yczogW1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuT1IsXG5cdFx0XHRcdFx0dGVzdHM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBbJ3JlZCcsICdncmVlbicsICdibHVlJ10sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRcdFx0XHRcdGRhdGF0eXBlOiAnc2V0Jyxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IFsnY3lhbicsICdtYWdlbnRhJywgJ3llbGxvdycsICdibHVlJ10sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50Lk9SLFxuXHRcdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdFx0ZGF0YXR5cGU6ICdzZXQnLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRkYXRhdHlwZTogJ3NldCcsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBbJ2N5YW4nLCAnbWFnZW50YScsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9KVxufSlcbiJdfQ==