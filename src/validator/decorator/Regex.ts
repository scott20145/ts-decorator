/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function regex(expression: RegExp, code: ErrorCode, value: string): ErrorCode {
	if (typeof value !== "string") {
		return code || ErrorCode.FAIL;
	}

	const reg = new RegExp(expression, "g");

	if (value.match(reg)) {
		return ErrorCode.SUCCESS;
	}

	return code || ErrorCode.FAIL;
}
/**
 * 字串regex驗證
 * true:此欄位符合條件, false: 此欄位不符合條件
 *
 * @export
 * @return {*}  {*}
 */
export function Regex(code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: regex.bind(regex, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
