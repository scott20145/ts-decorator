/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function isNumber(code: ErrorCode, value: unknown): ErrorCode {
	return typeof value === "number" ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
}

/**
 * true:此欄位為數字, false: 此欄位不為數字
 */
export function IsNumber(code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: isNumber.bind(isNumber, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
