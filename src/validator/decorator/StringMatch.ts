/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function stringMatch(regex: RegExp, code: ErrorCode, value: unknown): ErrorCode {
	if (typeof value !== "string") {
		return code || ErrorCode.FAIL;
	}
	return value.match(regex) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
}

/**
 * true:此欄位符合regex限制,
 * false: 此欄位不符合regex限制
 *
 * @export
 * @param {RegExp} [regex] pattern
 * @return {*}  {*}
 */
export function StringMatch(regex?: RegExp, code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: stringMatch.bind(stringMatch, regex, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
