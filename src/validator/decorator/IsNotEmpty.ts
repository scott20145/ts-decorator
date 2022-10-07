/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function isNotEmpty(code: ErrorCode, value: unknown): ErrorCode {
	return (value !== "" && value !== null && value !== undefined) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
}

/**
 * true:此欄位不為空, false: 此欄位為空或undefined
 */
export function IsNotEmpty(code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: isNotEmpty.bind(isNotEmpty, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
