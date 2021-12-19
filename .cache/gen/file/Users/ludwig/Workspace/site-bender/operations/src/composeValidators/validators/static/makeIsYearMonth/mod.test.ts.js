import makeIsYearMonth from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_YEAR_MONTH,
};
Deno.test('[makeIsYearMonth] returns correct validation when value is a date', () => {
    const validation = {
        datatype: 'yearMonth',
        value: '2000-01',
    };
    assertEquals(makeIsYearMonth(constraint)(validation), validation);
});
Deno.test('[makeIsYearMonth] returns error when value is not a date', () => {
    const validation = {
        datatype: 'yearMonth',
        value: 666,
    };
    assertEquals(makeIsYearMonth(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_YEAR_MONTH,
                constraint,
                errorMessage: 'RangeError: invalid ISO 8601 string: 666',
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGVBQWUsTUFBTSxVQUFVLENBQUE7QUFLdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUF3QjtJQUN2QyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsYUFBYTtDQUM5QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixtRUFBbUUsRUFDbkUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFdBQVc7UUFDckIsS0FBSyxFQUFFLFNBQVM7S0FDaEIsQ0FBQTtJQUVELFlBQVksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxFQUFFLEdBQUcsRUFBRTtJQUMxRSxNQUFNLFVBQVUsR0FBZ0M7UUFDL0MsUUFBUSxFQUFFLFdBQVc7UUFFckIsS0FBSyxFQUFFLEdBQUc7S0FDVixDQUFBO0lBRUQsWUFBWSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNyRCxHQUFHLFVBQVU7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxhQUFhO2dCQUNyQyxVQUFVO2dCQUNWLFlBQVksRUFBRSwwQ0FBMEM7YUFDeEQ7U0FDRDtLQUNELENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1ha2VJc1llYXJNb250aCBmcm9tICcuL21vZC50cydcbmltcG9ydCB7XG5cdFZhbGlkYXRpb24sXG5cdFllYXJNb250aENvbnN0cmFpbnQsXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHR5cGUgeyBZZWFyTW9udGhWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogWWVhck1vbnRoQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuSVNfWUVBUl9NT05USCxcbn1cblxuRGVuby50ZXN0KFxuXHQnW21ha2VJc1llYXJNb250aF0gcmV0dXJucyBjb3JyZWN0IHZhbGlkYXRpb24gd2hlbiB2YWx1ZSBpcyBhIGRhdGUnLFxuXHQoKSA9PiB7XG5cdFx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiA9IHtcblx0XHRcdGRhdGF0eXBlOiAneWVhck1vbnRoJyxcblx0XHRcdHZhbHVlOiAnMjAwMC0wMScsXG5cdFx0fVxuXG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc1llYXJNb250aChjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbbWFrZUlzWWVhck1vbnRoXSByZXR1cm5zIGVycm9yIHdoZW4gdmFsdWUgaXMgbm90IGEgZGF0ZScsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiAmIFllYXJNb250aFZhbHVlID0ge1xuXHRcdGRhdGF0eXBlOiAneWVhck1vbnRoJyxcblx0XHQvLyBAdHMtaWdub3JlOiBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuXHRcdHZhbHVlOiA2NjYsXG5cdH1cblxuXHRhc3NlcnRFcXVhbHMobWFrZUlzWWVhck1vbnRoKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX1lFQVJfTU9OVEgsXG5cdFx0XHRcdGNvbnN0cmFpbnQsXG5cdFx0XHRcdGVycm9yTWVzc2FnZTogJ1JhbmdlRXJyb3I6IGludmFsaWQgSVNPIDg2MDEgc3RyaW5nOiA2NjYnLFxuXHRcdFx0fSxcblx0XHRdLFxuXHR9KVxufSlcbiJdfQ==