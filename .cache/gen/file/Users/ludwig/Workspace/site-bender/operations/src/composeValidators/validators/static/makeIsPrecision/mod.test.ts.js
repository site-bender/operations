import makeIsPrecision from './mod.ts';
import { TypeOfConstraint } from '../../../../types/enums.ts';
import { assertEquals } from 'https://deno.land/std@0.118.0/testing/asserts.ts';
const constraint = {
    constraintType: TypeOfConstraint.IS_PRECISION,
    decimalPlaces: 4,
};
const validation = {
    datatype: 'precision',
    value: 3.1415,
    decimalPlaces: 4,
};
Deno.test('[makeIsPrecision] returns correct validation when value is a correct precision number', () => {
    assertEquals(makeIsPrecision(constraint)(validation), validation);
});
Deno.test('[makeIsPrecision] defaults precision to zero', () => {
    assertEquals(makeIsPrecision({
        ...constraint,
        decimalPlaces: undefined,
    })(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_PRECISION,
                constraint: {
                    ...constraint,
                    decimalPlaces: undefined,
                },
            },
        ],
    });
});
Deno.test('[makeIsPrecision] returns correct validation when value is a correct precision number', () => {
    assertEquals(makeIsPrecision(constraint)(validation), validation);
});
Deno.test('[makeIsPrecision] returns error when value is not a precision number but should be', () => {
    assertEquals(makeIsPrecision({
        ...constraint,
        decimalPlaces: 3,
    })(validation), {
        ...validation,
        isInvalid: true,
        errors: [
            {
                error: TypeOfConstraint.IS_PRECISION,
                constraint: {
                    ...constraint,
                    decimalPlaces: 3,
                },
            },
        ],
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2QudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGVBQWUsTUFBTSxVQUFVLENBQUE7QUFLdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtEQUFrRCxDQUFBO0FBRS9FLE1BQU0sVUFBVSxHQUE0QjtJQUMzQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtJQUM3QyxhQUFhLEVBQUUsQ0FBQztDQUNoQixDQUFBO0FBRUQsTUFBTSxVQUFVLEdBQWU7SUFDOUIsUUFBUSxFQUFFLFdBQVc7SUFDckIsS0FBSyxFQUFFLE1BQU07SUFDYixhQUFhLEVBQUUsQ0FBQztDQUNoQixDQUFBO0FBRUQsSUFBSSxDQUFDLElBQUksQ0FDUix1RkFBdUYsRUFDdkYsR0FBRyxFQUFFO0lBQ0osWUFBWSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtBQUNsRSxDQUFDLENBQ0QsQ0FBQTtBQUVELElBQUksQ0FBQyxJQUFJLENBQUMsOENBQThDLEVBQUUsR0FBRyxFQUFFO0lBQzlELFlBQVksQ0FDWCxlQUFlLENBQUM7UUFDZixHQUFHLFVBQVU7UUFFYixhQUFhLEVBQUUsU0FBUztLQUN4QixDQUFDLENBQUMsVUFBVSxDQUFDLEVBQ2Q7UUFDQyxHQUFHLFVBQVU7UUFDYixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRTtZQUNQO2dCQUNDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxZQUFZO2dCQUNwQyxVQUFVLEVBQUU7b0JBQ1gsR0FBRyxVQUFVO29CQUNiLGFBQWEsRUFBRSxTQUFTO2lCQUN4QjthQUNEO1NBQ0Q7S0FDRCxDQUNELENBQUE7QUFDRixDQUFDLENBQUMsQ0FBQTtBQUVGLElBQUksQ0FBQyxJQUFJLENBQ1IsdUZBQXVGLEVBQ3ZGLEdBQUcsRUFBRTtJQUNKLFlBQVksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUNELENBQUE7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUNSLG9GQUFvRixFQUNwRixHQUFHLEVBQUU7SUFDSixZQUFZLENBQ1gsZUFBZSxDQUFDO1FBQ2YsR0FBRyxVQUFVO1FBQ2IsYUFBYSxFQUFFLENBQUM7S0FDaEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUNkO1FBQ0MsR0FBRyxVQUFVO1FBQ2IsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUU7WUFDUDtnQkFDQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsWUFBWTtnQkFDcEMsVUFBVSxFQUFFO29CQUNYLEdBQUcsVUFBVTtvQkFDYixhQUFhLEVBQUUsQ0FBQztpQkFDaEI7YUFDRDtTQUNEO0tBQ0QsQ0FDRCxDQUFBO0FBQ0YsQ0FBQyxDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFrZUlzUHJlY2lzaW9uIGZyb20gJy4vbW9kLnRzJ1xuaW1wb3J0IHtcblx0UHJlY2lzaW9uVHlwZUNvbnN0cmFpbnQsXG5cdFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2NvbnN0cmFpbnRzLnRzJ1xuaW1wb3J0IHsgVHlwZU9mQ29uc3RyYWludCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2VudW1zLnRzJ1xuaW1wb3J0IHsgYXNzZXJ0RXF1YWxzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTE4LjAvdGVzdGluZy9hc3NlcnRzLnRzJ1xuXG5jb25zdCBjb25zdHJhaW50OiBQcmVjaXNpb25UeXBlQ29uc3RyYWludCA9IHtcblx0Y29uc3RyYWludFR5cGU6IFR5cGVPZkNvbnN0cmFpbnQuSVNfUFJFQ0lTSU9OLFxuXHRkZWNpbWFsUGxhY2VzOiA0LFxufVxuXG5jb25zdCB2YWxpZGF0aW9uOiBWYWxpZGF0aW9uID0ge1xuXHRkYXRhdHlwZTogJ3ByZWNpc2lvbicsXG5cdHZhbHVlOiAzLjE0MTUsXG5cdGRlY2ltYWxQbGFjZXM6IDQsXG59XG5cbkRlbm8udGVzdChcblx0J1ttYWtlSXNQcmVjaXNpb25dIHJldHVybnMgY29ycmVjdCB2YWxpZGF0aW9uIHdoZW4gdmFsdWUgaXMgYSBjb3JyZWN0IHByZWNpc2lvbiBudW1iZXInLFxuXHQoKSA9PiB7XG5cdFx0YXNzZXJ0RXF1YWxzKG1ha2VJc1ByZWNpc2lvbihjb25zdHJhaW50KSh2YWxpZGF0aW9uKSwgdmFsaWRhdGlvbilcblx0fSxcbilcblxuRGVuby50ZXN0KCdbbWFrZUlzUHJlY2lzaW9uXSBkZWZhdWx0cyBwcmVjaXNpb24gdG8gemVybycsICgpID0+IHtcblx0YXNzZXJ0RXF1YWxzKFxuXHRcdG1ha2VJc1ByZWNpc2lvbih7XG5cdFx0XHQuLi5jb25zdHJhaW50LFxuXHRcdFx0Ly8gQHRzLWlnbm9yZTogZm9yIHRlc3RpbmcgcHVycG9zZXNcblx0XHRcdGRlY2ltYWxQbGFjZXM6IHVuZGVmaW5lZCxcblx0XHR9KSh2YWxpZGF0aW9uKSxcblx0XHR7XG5cdFx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdFx0aXNJbnZhbGlkOiB0cnVlLFxuXHRcdFx0ZXJyb3JzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRlcnJvcjogVHlwZU9mQ29uc3RyYWludC5JU19QUkVDSVNJT04sXG5cdFx0XHRcdFx0Y29uc3RyYWludDoge1xuXHRcdFx0XHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdFx0XHRcdGRlY2ltYWxQbGFjZXM6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHR9LFxuXHQpXG59KVxuXG5EZW5vLnRlc3QoXG5cdCdbbWFrZUlzUHJlY2lzaW9uXSByZXR1cm5zIGNvcnJlY3QgdmFsaWRhdGlvbiB3aGVuIHZhbHVlIGlzIGEgY29ycmVjdCBwcmVjaXNpb24gbnVtYmVyJyxcblx0KCkgPT4ge1xuXHRcdGFzc2VydEVxdWFscyhtYWtlSXNQcmVjaXNpb24oY29uc3RyYWludCkodmFsaWRhdGlvbiksIHZhbGlkYXRpb24pXG5cdH0sXG4pXG5cbkRlbm8udGVzdChcblx0J1ttYWtlSXNQcmVjaXNpb25dIHJldHVybnMgZXJyb3Igd2hlbiB2YWx1ZSBpcyBub3QgYSBwcmVjaXNpb24gbnVtYmVyIGJ1dCBzaG91bGQgYmUnLFxuXHQoKSA9PiB7XG5cdFx0YXNzZXJ0RXF1YWxzKFxuXHRcdFx0bWFrZUlzUHJlY2lzaW9uKHtcblx0XHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdFx0ZGVjaW1hbFBsYWNlczogMyxcblx0XHRcdH0pKHZhbGlkYXRpb24pLFxuXHRcdFx0e1xuXHRcdFx0XHQuLi52YWxpZGF0aW9uLFxuXHRcdFx0XHRpc0ludmFsaWQ6IHRydWUsXG5cdFx0XHRcdGVycm9yczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGVycm9yOiBUeXBlT2ZDb25zdHJhaW50LklTX1BSRUNJU0lPTixcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnQ6IHtcblx0XHRcdFx0XHRcdFx0Li4uY29uc3RyYWludCxcblx0XHRcdFx0XHRcdFx0ZGVjaW1hbFBsYWNlczogMyxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0KVxuXHR9LFxuKVxuIl19