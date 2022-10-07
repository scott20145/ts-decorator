/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function stringLength(min: number, max: number, code: ErrorCode, value: unknown): ErrorCode {
	if (typeof value !== "string") {
		return code || ErrorCode.FAIL;
	}

	if (min !== undefined && value.length < min) {
		return code || ErrorCode.FAIL;
	}

	if (max !== undefined && value.length > max) {
		return code || ErrorCode.FAIL;
	}

	return ErrorCode.SUCCESS;
}
/**
 * true:此欄位符合字串長度限制, false: 此欄位不符合字串長度限制
 *
 * @export
 * @param {number} [min] 輸入字串最小字數限制
 * @param {number} [max] 輸入字串最大字數限制
 * @return {*}  {*}
 */
export function StringLength(min?: number, max?: number, code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: stringLength.bind(stringLength, min, max, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
