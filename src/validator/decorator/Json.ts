/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function json(code: ErrorCode, value: string): ErrorCode {
	try {
		JSON.parse(value);
		return ErrorCode.SUCCESS;
	}
	catch (e) {
		return code || ErrorCode.FAIL;
	}
}

/**
 * true:此欄位為json, false: 此欄位不為json
 */
export function Json(code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: json.bind(json, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
