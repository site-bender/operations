import makeIsTimeZone from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_TIME_ZONE,
};
Deno.test('[makeIsTimeZone] returns correct validation when value is a date', () => {
    const validation = {
        datatype: 'timeZone',
        value: 'NZT',
    };
    assertEquals(makeIsTimeZone(constraint)(validation), validation);
});
Deno.test('[makeIsTimeZone] returns error when value is not a date', () => {
    const validation = {
        datatype: 'timeZone',
        value: 666,
    };
    assertEquals(makeIsTimeZone(constraint)(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_TIME_ZONE,
                constraint,
                errorMessage: 'RangeError: invalid ISO 8601 string: 666',
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWMsTUFBTSxVQUFVLENBQUE7QUFLckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUEyQjtJQUMxQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtDQUM3QyxDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUixrRUFBa0UsRUFDbEUsR0FBRyxFQUFFO0lBQ0osTUFBTSxVQUFVLEdBQWU7UUFDOUIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsS0FBSyxFQUFFLEtBQUs7S0FDWixDQUFBO0lBRUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUNqRSxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMseURBQXlELEVBQUUsR0FBRyxFQUFFO0lBQ3pFLE1BQU0sVUFBVSxHQUErQjtRQUM5QyxRQUFRLEVBQUUsVUFBVTtRQUVwQixLQUFLLEVBQUUsR0FBRztLQUNWLENBQUE7SUFFRCxZQUFZLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3BELEdBQUcsVUFBVTtRQUNiLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFO1lBQ1A7Z0JBQ0MsS0FBSyxFQUFFLGdCQUFnQixDQUFDLFlBQVk7Z0JBQ3BDLFVBQVU7Z0JBQ1YsWUFBWSxFQUFFLDBDQUEwQzthQUN4RDtTQUNEO0tBQ0QsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZUlzVGltZVpvbmUgZnJvbSAnLi9tb2QudHMnXG5pbXBvcnQge1xuXHRUaW1lWm9uZVR5cGVDb25zdHJhaW50LFxuXHRWYWxpZGF0aW9uLFxufSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9jb25zdHJhaW50cy50cydcbmltcG9ydCB7IFR5cGVPZkNvbnN0cmFpbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9lbnVtcy50cydcbmltcG9ydCB0eXBlIHsgVGltZVpvbmVWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcbmltcG9ydCB7IGFzc2VydEVxdWFscyB9IGZyb20gJ2h0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL3Rlc3RpbmcvYXNzZXJ0cy50cydcblxuY29uc3QgY29uc3RyYWludDogVGltZVpvbmVUeXBlQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuSVNfVElNRV9aT05FLFxufVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzVGltZVpvbmVdIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdoZW4gdmFsdWUgaXMgYSBkYXRlJyxcblx0KCkgPT4ge1xuXHRcdGNvbnN0IHZhbGlkYXRpb246IFZhbGlkYXRpb24gPSB7XG5cdFx0XHRkYXRhdHlwZTogJ3RpbWVab25lJyxcblx0XHRcdHZhbHVlOiAnTlpUJyxcblx0XHR9XG5cblx0XHRhc3NlcnRFcXVhbHMobWFrZUlzVGltZVpvbmUoY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdCgnW21ha2VJc1RpbWVab25lXSByZXR1cm5zIGVycm9yIHdoZW4gdmFsdWUgaXMgbm90IGEgZGF0ZScsICgpID0+IHtcblx0Y29uc3QgdmFsaWRhdGlvbjogVmFsaWRhdGlvbiAmIFRpbWVab25lVmFsdWUgPSB7XG5cdFx0ZGF0YXR5cGU6ICd0aW1lWm9uZScsXG5cdFx0Ly8gQHRzLWlnbm9yZTogZm9yIHRlc3RpbmcgcHVycG9zZXNcblx0XHR2YWx1ZTogNjY2LFxuXHR9XG5cblx0YXNzZXJ0RXF1YWxzKG1ha2VJc1RpbWVab25lKGNvbnN0cmFpbnQpKHZhbGlkYXRpb24pLCB7XG5cdFx0Li4udmFsaWRhdGlvbixcblx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0ZXJyb3JzOiBbXG5cdFx0XHR7XG5cdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX1RJTUVfWk9ORSxcblx0XHRcdFx0Y29uc3RyYWludCxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiAnUmFuZ2VFcnJvcjogaW52YWxpZCBJU08gODYwMSBzdHJpbmc6IDY2NicsXG5cdFx0XHR9LFxuXHRcdF0sXG5cdH0pXG59KVxuIl19