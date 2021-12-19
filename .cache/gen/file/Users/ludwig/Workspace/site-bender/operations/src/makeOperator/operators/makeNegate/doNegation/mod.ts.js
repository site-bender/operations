export default function doNegation(value) {
    if (typeof value === 'number') {
        return Number.isInteger(value)
            ? {
                datatype: 'integer',
                value: value * -1,
            }
            : {
                datatype: 'real',
                value: value * -1,
            };
    }
    if (value.datatype === 'fraction') {
        return {
            datatype: 'fraction',
            value: {
                denominator: value.value.denominator * -1,
                numerator: value.value.numerator,
            },
        };
    }
    return {
        ...value,
        value: value.value * -1,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLEtBQTJCO0lBQzdELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzlCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDN0IsQ0FBQyxDQUFDO2dCQUNBLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNoQjtZQUNILENBQUMsQ0FBQztnQkFDQSxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDaEIsQ0FBQTtLQUNKO0lBRUQsSUFBSyxLQUFxQixDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDbkQsT0FBTztZQUNOLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLEtBQUssRUFBRTtnQkFDTixXQUFXLEVBQUcsS0FBdUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDNUQsU0FBUyxFQUFHLEtBQXVCLENBQUMsS0FBSyxDQUFDLFNBQVM7YUFDbkQ7U0FDRCxDQUFBO0tBQ0Q7SUFFRCxPQUFPO1FBQ04sR0FBSSxLQUEwQjtRQUM5QixLQUFLLEVBQUcsS0FBMEIsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQzdDLENBQUE7QUFDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0RnJhY3Rpb25WYWx1ZSxcblx0Tm9uRnJhY3Rpb25WYWx1ZSxcblx0TnVtYmVyVmFsdWUsXG59IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL3ZhbHVlcy50cydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9OZWdhdGlvbih2YWx1ZTogTnVtYmVyVmFsdWUgfCBudW1iZXIpOiBOdW1iZXJWYWx1ZSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIE51bWJlci5pc0ludGVnZXIodmFsdWUpXG5cdFx0XHQ/IHtcblx0XHRcdFx0XHRkYXRhdHlwZTogJ2ludGVnZXInLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSAqIC0xLFxuXHRcdFx0ICB9XG5cdFx0XHQ6IHtcblx0XHRcdFx0XHRkYXRhdHlwZTogJ3JlYWwnLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZSAqIC0xLFxuXHRcdFx0ICB9XG5cdH1cblxuXHRpZiAoKHZhbHVlIGFzIE51bWJlclZhbHVlKS5kYXRhdHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRkYXRhdHlwZTogJ2ZyYWN0aW9uJyxcblx0XHRcdHZhbHVlOiB7XG5cdFx0XHRcdGRlbm9taW5hdG9yOiAodmFsdWUgYXMgRnJhY3Rpb25WYWx1ZSkudmFsdWUuZGVub21pbmF0b3IgKiAtMSxcblx0XHRcdFx0bnVtZXJhdG9yOiAodmFsdWUgYXMgRnJhY3Rpb25WYWx1ZSkudmFsdWUubnVtZXJhdG9yLFxuXHRcdFx0fSxcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdC4uLih2YWx1ZSBhcyBOb25GcmFjdGlvblZhbHVlKSxcblx0XHR2YWx1ZTogKHZhbHVlIGFzIE5vbkZyYWN0aW9uVmFsdWUpLnZhbHVlICogLTEsXG5cdH1cbn1cbiJdfQ==