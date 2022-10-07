/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

const dateTimeRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3])(:)(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])(:)(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/;

function dateTimeRange(code: ErrorCode, value: unknown): ErrorCode {
	if (typeof value !== "string") {
		return code || ErrorCode.FAIL;
	}

	const arr = value.split(",");
	if (arr.length !== 2) {
		return code || ErrorCode.FAIL;
	}

	if (arr[0].match(dateTimeRegex) && arr[1].match(dateTimeRegex)) {
		return ErrorCode.SUCCESS;
	}

	return code || ErrorCode.FAIL;
}
/**
 * 日期時間區間字串驗證
 * true:此欄位符合限制, false: 此欄位不符合限制
 *
 * @export
 * @return {*}  {*}
 */
export function DateTimeRange(code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: dateTimeRange.bind(dateTimeRange, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
