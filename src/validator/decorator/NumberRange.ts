/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function numberRange(min: number, max: number, code: ErrorCode, value: unknown): ErrorCode {
	if (typeof value !== "number") {
		return code || ErrorCode.FAIL;
	}

	if (min !== undefined && value < min) {
		return code || ErrorCode.FAIL;
	}

	if (max !== undefined && value > max) {
		return code || ErrorCode.FAIL;
	}

	return ErrorCode.SUCCESS;
}
/**
 * 數值區間驗證
 * true:此欄位符合限制, false: 此欄位不符合限制
 *
 * @export
 * @param {number} [min] 最小值限制
 * @param {number} [max] 最大值限制
 * @param {ErrorCode} [code] 錯誤碼
 * @return {*}  {*}
 */
export function NumberRange(min?: number, max?: number, code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: numberRange.bind(numberRange, min, max, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
