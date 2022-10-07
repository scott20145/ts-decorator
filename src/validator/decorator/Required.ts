/* eslint-disable @typescript-eslint/naming-convention */

import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function required(code: ErrorCode, value: unknown): ErrorCode {
	if (value === undefined || value === null) {
		return code || ErrorCode.FAIL;
	}
	return ErrorCode.SUCCESS;
}
/**
 * 標記該屬性為必填欄位
 *
 * @export
 * @return {*}  {*}
 */
export function Required(code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			decoratorName: "Required",
			object,
			propertyName,
			exec: required.bind(required, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
