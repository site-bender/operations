import exactlyNCharacters from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const validation = {
    datatype: 'string',
    value: 'Peter Piper picked a peck of pickled peppers.',
};
Deno.test('[exactlyNCharacters] returns error if string length less than constraint value', () => {
    const constraint = {
        constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
        operand: 46,
    };
    assertEquals(exactlyNCharacters(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.EXACTLY_N_CHARACTERS,
            },
        ],
        isInvalid: true,
    });
});
Deno.test('[exactlyNCharacters] returns correct validation if string length equals constraint value', () => {
    const constraint = {
        constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
        operand: 45,
    };
    assertEquals(exactlyNCharacters(constraint)(validation), validation);
});
Deno.test('[exactlyNCharacters] returns error if string length more than constraint value', () => {
    const constraint = {
        constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
        operand: 44,
    };
    assertEquals(exactlyNCharacters(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.EXACTLY_N_CHARACTERS,
            },
        ],
        isInvalid: true,
    });
});
Deno.test('[exactlyNCharacters] returns correct validation if string length equal to constraint value using match', () => {
    const constraint = {
        constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
        operand: 12,
        match: /([pc])/gi,
    };
    assertEquals(exactlyNCharacters(constraint)(validation), validation);
});
Deno.test('[exactlyNCharacters] returns correct response when match returns null', () => {
    const constraint = {
        constraintType: TypeOfConstraint.EXACTLY_N_CHARACTERS,
        operand: 13,
        match: /([x])/gi,
    };
    assertEquals(exactlyNCharacters(constraint)(validation), {
        ...validation,
        errors: [
            {
                constraint,
                error: TypeOfConstraint.EXACTLY_N_CHARACTERS,
            },
        ],
        isInvalid: true,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGtCQUFrQixNQUFNLFVBQVUsQ0FBQTtBQUt6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0RBQWtELENBQUE7QUFFL0UsTUFBTSxVQUFVLEdBQWU7SUFDOUIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsS0FBSyxFQUFFLCtDQUErQztDQUN0RCxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixnRkFBZ0YsRUFDaEYsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWlDO1FBQ2hELGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxvQkFBb0I7UUFDckQsT0FBTyxFQUFFLEVBQUU7S0FDWCxDQUFBO0lBRUQsWUFBWSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3hELEdBQUcsVUFBVTtRQUNiLE1BQU0sRUFBRTtZQUNQO2dCQUNDLFVBQVU7Z0JBQ1YsS0FBSyxFQUFFLGdCQUFnQixDQUFDLG9CQUFvQjthQUM1QztTQUNEO1FBQ0QsU0FBUyxFQUFFLElBQUk7S0FDZixDQUFDLENBQUE7QUFDSCxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1IsMEZBQTBGLEVBQzFGLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFpQztRQUNoRCxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsb0JBQW9CO1FBQ3JELE9BQU8sRUFBRSxFQUFFO0tBQ1gsQ0FBQTtJQUVELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUNyRSxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQ1IsZ0ZBQWdGLEVBQ2hGLEdBQUcsRUFBRTtJQUNKLE1BQU0sVUFBVSxHQUFpQztRQUNoRCxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsb0JBQW9CO1FBQ3JELE9BQU8sRUFBRSxFQUFFO0tBQ1gsQ0FBQTtJQUVELFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN4RCxHQUFHLFVBQVU7UUFDYixNQUFNLEVBQUU7WUFDUDtnQkFDQyxVQUFVO2dCQUNWLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxvQkFBb0I7YUFDNUM7U0FDRDtRQUNELFNBQVMsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLHdHQUF3RyxFQUN4RyxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBaUM7UUFDaEQsY0FBYyxFQUFFLGdCQUFnQixDQUFDLG9CQUFvQjtRQUNyRCxPQUFPLEVBQUUsRUFBRTtRQUNYLEtBQUssRUFBRSxVQUFVO0tBQ2pCLENBQUE7SUFFRCxZQUFZLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDckUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLHVFQUF1RSxFQUN2RSxHQUFHLEVBQUU7SUFDSixNQUFNLFVBQVUsR0FBaUM7UUFDaEQsY0FBYyxFQUFFLGdCQUFnQixDQUFDLG9CQUFvQjtRQUNyRCxPQUFPLEVBQUUsRUFBRTtRQUNYLEtBQUssRUFBRSxTQUFTO0tBQ2hCLENBQUE7SUFFRCxZQUFZLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDeEQsR0FBRyxVQUFVO1FBQ2IsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsVUFBVTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsb0JBQW9CO2FBQzVDO1NBQ0Q7UUFDRCxTQUFTLEVBQUUsSUFBSTtLQUNmLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4YWN0bHlOQ2hhcmFjdGVycyBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdEV4YWN0bHlOQ2hhcmFjdGVyc0NvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRkYXRhdHlwZTogJ3N0cmluZycsXG5cdHZhbHVlOiAnUGV0ZXIgUGlwZXIgcGlja2VkIGEgcGVjayBvZiBwaWNrbGVkIHBlcHBlcnMuJyxcbn1cblxuRGVuby50ZXN0KFxuXHQnW2V4YWN0bHlOQ2hhcmFjdGVyc10gcmV0dXJucyBlcnJvciBpZiBzdHJpbmcgbGVuZ3RoIGxlc3MgdGhhbiBjb25zdHJhaW50IHZhbHVlJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IGNvbnN0cmFpbnQ6IEV4YWN0bHlOQ2hhcmFjdGVyc0NvbnN0cmFpbnQgPSB7XG5cdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5FWEFDVExZX05fQ0hBUkFDVEVSUyxcblx0XHRcdG9wZXJhbmQ6IDQ2LFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhleGFjdGx5TkNoYXJhY3RlcnMoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuRVhBQ1RMWV9OX0NIQVJBQ1RFUlMsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdH0pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1tleGFjdGx5TkNoYXJhY3RlcnNdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIGlmIHN0cmluZyBsZW5ndGggZXF1YWxzIGNvbnN0cmFpbnQgdmFsdWUnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgY29uc3RyYWludDogRXhhY3RseU5DaGFyYWN0ZXJzQ29uc3RyYWludCA9IHtcblx0XHRcdGNvbnN0cmFpbnRUeXBlOiBUeXBlT2ZDb25zdHJhaW50LkVYQUNUTFlfTl9DSEFSQUNURVJTLFxuXHRcdFx0b3BlcmFuZDogNDUsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKGV4YWN0bHlOQ2hhcmFjdGVycyhjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KFxuXHQnW2V4YWN0bHlOQ2hhcmFjdGVyc10gcmV0dXJucyBlcnJvciBpZiBzdHJpbmcgbGVuZ3RoIG1vcmUgdGhhbiBjb25zdHJhaW50IHZhbHVlJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IGNvbnN0cmFpbnQ6IEV4YWN0bHlOQ2hhcmFjdGVyc0NvbnN0cmFpbnQgPSB7XG5cdFx0XHRjb25zdHJhaW50VHlwZTogVHlwZU9mQ29uc3RyYWludC5FWEFDVExZX05fQ0hBUkFDVEVSUyxcblx0XHRcdG9wZXJhbmQ6IDQ0LFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhleGFjdGx5TkNoYXJhY3RlcnMoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHtcblx0XHRcdC4uLnZhbGlkYXRpb24sXG5cdFx0XHRlcnJvcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdFx0ZXJyb3I6IFR5cGVPZkNvbnN0cmFpbnQuRVhBQ1RMWV9OX0NIQVJBQ1RFUlMsXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdH0pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1tleGFjdGx5TkNoYXJhY3RlcnNdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIGlmIHN0cmluZyBsZW5ndGggZXF1YWwgdG8gY29uc3RyYWludCB2YWx1ZSB1c2luZyBtYXRjaCcsXG5cdCgpID0+IHtcblx0XHRjb25zdCBjb25zdHJhaW50OiBFeGFjdGx5TkNoYXJhY3RlcnNDb25zdHJhaW50ID0ge1xuXHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuRVhBQ1RMWV9OX0NIQVJBQ1RFUlMsXG5cdFx0XHRvcGVyYW5kOiAxMixcblx0XHRcdG1hdGNoOiAvKFtwY10pL2dpLFxuXHRcdH1cblxuXHRcdGFzc2VydEVxdWFscyhleGFjdGx5TkNoYXJhY3RlcnMoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1tleGFjdGx5TkNoYXJhY3RlcnNdIHJldHVybnMgY29ycmVjdCByZXNwb25zZSB3aGVuIG1hdGNoIHJldHVybnMgbnVsbCcsXG5cdCgpID0+IHtcblx0XHRjb25zdCBjb25zdHJhaW50OiBFeGFjdGx5TkNoYXJhY3RlcnNDb25zdHJhaW50ID0ge1xuXHRcdFx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuRVhBQ1RMWV9OX0NIQVJBQ1RFUlMsXG5cdFx0XHRvcGVyYW5kOiAxMyxcblx0XHRcdG1hdGNoOiAvKFt4XSkvZ2ksXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKGV4YWN0bHlOQ2hhcmFjdGVycyhjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwge1xuXHRcdFx0Li4udmFsaWRhdGlvbixcblx0XHRcdGVycm9yczogW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5FWEFDVExZX05fQ0hBUkFDVEVSUyxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0fSlcblx0fSxcbilcbiJdfQ==