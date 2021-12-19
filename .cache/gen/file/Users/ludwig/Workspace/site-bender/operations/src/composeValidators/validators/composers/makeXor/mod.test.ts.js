import xor from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.XOR,
    tests: [
        {
            constraintType: TypeOfConstraint.MEMBER,
            operand: ['red', 'green', 'blue'],
        },
        {
            constraintType: TypeOfConstraint.MEMBER,
            operand: ['cyan', 'magenta', 'yellow', 'blue'],
        },
        {
            constraintType: TypeOfConstraint.MEMBER,
            operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
        },
    ],
};
const validate = xor(constraint);
Deno.test('[xor] passes when one constraint check passes', () => {
    const validation = {
        datatype: 'member',
        value: 'red',
    };
    assertEquals(validate(validation), validation);
});
Deno.test('[xor] fails when more than one constraint check passes', () => {
    const validation = {
        datatype: 'member',
        value: 'yellow',
    };
    assertEquals(validate(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                constraint: {
                    constraintType: TypeOfConstraint.XOR,
                    tests: [
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['red', 'green', 'blue'],
                        },
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['cyan', 'magenta', 'yellow', 'blue'],
                        },
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
                        },
                    ],
                },
                error: TypeOfConstraint.XOR,
                errors: [
                    {
                        error: TypeOfConstraint.MEMBER,
                        constraint: {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['red', 'green', 'blue'],
                        },
                    },
                ],
            },
        ],
    });
});
Deno.test('[xor] fails when all constraint checks pass', () => {
    const validation = {
        datatype: 'member',
        value: 'blue',
    };
    assertEquals(validate(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                constraint: {
                    constraintType: TypeOfConstraint.XOR,
                    tests: [
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['red', 'green', 'blue'],
                        },
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['cyan', 'magenta', 'yellow', 'blue'],
                        },
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
                        },
                    ],
                },
                error: TypeOfConstraint.XOR,
                errors: [],
            },
        ],
    });
});
Deno.test('[xor] fails when all constraint checks fail', () => {
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
                    constraintType: TypeOfConstraint.XOR,
                    tests: [
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['red', 'green', 'blue'],
                        },
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['cyan', 'magenta', 'yellow', 'blue'],
                        },
                        {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
                        },
                    ],
                },
                error: TypeOfConstraint.XOR,
                errors: [
                    {
                        error: TypeOfConstraint.MEMBER,
                        constraint: {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['red', 'green', 'blue'],
                        },
                    },
                    {
                        error: TypeOfConstraint.MEMBER,
                        constraint: {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['cyan', 'magenta', 'yellow', 'blue'],
                        },
                    },
                    {
                        error: TypeOfConstraint.MEMBER,
                        constraint: {
                            constraintType: TypeOfConstraint.MEMBER,
                            operand: ['chartreuse', 'mauve', 'yellow', 'blue'],
                        },
                    },
                ],
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxVQUFVLENBQUE7QUFLMUIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUFrQjtJQUNqQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsR0FBRztJQUNwQyxLQUFLLEVBQUU7UUFDTjtZQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO1lBQ3ZDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO1NBQ2pDO1FBQ0Q7WUFDQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsTUFBTTtZQUN2QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7U0FDOUM7UUFDRDtZQUNDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNO1lBQ3ZDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztTQUNsRDtLQUNEO0NBQ0QsQ0FBQTtBQUVELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtJQUMvRCxNQUFNLFVBQVUsR0FBZTtRQUM5QixRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsS0FBSztLQUNaLENBQUE7SUFFRCxZQUFZLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQy9DLENBQUMsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyx3REFBd0QsRUFBRSxHQUFHLEVBQUU7SUFDeEUs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QUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeG9yIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHR5cGUge1xuXHRWYWxpZGF0aW9uLFxuXHRYb3JDb25zdHJhaW50LFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogWG9yQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuWE9SLFxuXHR0ZXN0czogW1xuXHRcdHtcblx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdG9wZXJhbmQ6IFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnXSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdG9wZXJhbmQ6IFsnY3lhbicsICdtYWdlbnRhJywgJ3llbGxvdycsICdibHVlJ10sXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRvcGVyYW5kOiBbJ2NoYXJ0cmV1c2UnLCAnbWF1dmUnLCAneWVsbG93JywgJ2JsdWUnXSxcblx0XHR9LFxuXHRdLFxufVxuXG5jb25zdCB2YWxpZGF0ZSA9IHhvcihjb25zdHJhaW50KVxuXG5EZW5vLnRlc3QoJ1t4b3JdIHBhc3NlcyB3aGVuIG9uZSBjb25zdHJhaW50IGNoZWNrIHBhc3NlcycsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRkYXRhdHlwZTogJ21lbWJlcicsXG5cdFx0dmFsdWU6ICdyZWQnLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKHZhbGlkYXRlKHZhbGlkYXRpb24pLCB2YWxpZGF0aW9uKVxufSlcblxuRGVuby50ZXN0KCdbeG9yXSBmYWlscyB3aGVuIG1vcmUgdGhhbiBvbmUgY29uc3RyYWludCBjaGVjayBwYXNzZXMnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdtZW1iZXInLFxuXHRcdHZhbHVlOiAneWVsbG93Jyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyh2YWxpZGF0ZSh2YWxpZGF0aW9uKSwge1xuXHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdGVycm9yczogW1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuWE9SLFxuXHRcdFx0XHRcdHRlc3RzOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdFx0b3BlcmFuZDogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiBbJ2N5YW4nLCAnbWFnZW50YScsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiBbJ2NoYXJ0cmV1c2UnLCAnbWF1dmUnLCAneWVsbG93JywgJ2JsdWUnXSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuWE9SLFxuXHRcdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdFx0b3BlcmFuZDogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9KVxufSlcblxuRGVuby50ZXN0KCdbeG9yXSBmYWlscyB3aGVuIGFsbCBjb25zdHJhaW50IGNoZWNrcyBwYXNzJywgKCkgPT4ge1xuXHRjb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRcdGRhdGF0eXBlOiAnbWVtYmVyJyxcblx0XHR2YWx1ZTogJ2JsdWUnLFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKHZhbGlkYXRlKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5YT1IsXG5cdFx0XHRcdFx0dGVzdHM6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiBbJ3JlZCcsICdncmVlbicsICdibHVlJ10sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRcdFx0XHRcdG9wZXJhbmQ6IFsnY3lhbicsICdtYWdlbnRhJywgJ3llbGxvdycsICdibHVlJ10sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRcdFx0XHRcdG9wZXJhbmQ6IFsnY2hhcnRyZXVzZScsICdtYXV2ZScsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5YT1IsXG5cdFx0XHRcdGVycm9yczogW10sXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuXG5EZW5vLnRlc3QoJ1t4b3JdIGZhaWxzIHdoZW4gYWxsIGNvbnN0cmFpbnQgY2hlY2tzIGZhaWwnLCAoKSA9PiB7XG5cdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0ZGF0YXR5cGU6ICdtZW1iZXInLFxuXHRcdHZhbHVlOiAnb3JhbmdlJyxcblx0fVxuXG5cdGFzc2VydEVxdWFscyh2YWxpZGF0ZSh2YWxpZGF0aW9uKSwge1xuXHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdGVycm9yczogW1xuXHRcdFx0e1xuXHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuWE9SLFxuXHRcdFx0XHRcdHRlc3RzOiBbXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdFx0b3BlcmFuZDogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiBbJ2N5YW4nLCAnbWFnZW50YScsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiBbJ2NoYXJ0cmV1c2UnLCAnbWF1dmUnLCAneWVsbG93JywgJ2JsdWUnXSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuWE9SLFxuXHRcdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5NRU1CRVIsXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50OiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdFx0b3BlcmFuZDogWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiBbJ2N5YW4nLCAnbWFnZW50YScsICd5ZWxsb3cnLCAnYmx1ZSddLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50Lk1FTUJFUixcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuTUVNQkVSLFxuXHRcdFx0XHRcdFx0XHRvcGVyYW5kOiBbJ2NoYXJ0cmV1c2UnLCAnbWF1dmUnLCAneWVsbG93JywgJ2JsdWUnXSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XSxcblx0fSlcbn0pXG4iXX0=