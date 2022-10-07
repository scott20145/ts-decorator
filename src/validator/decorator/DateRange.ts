/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

function dateRange(code: ErrorCode, value: unknown): ErrorCode {
	if (typeof value !== "string") {
		return code || ErrorCode.FAIL;
	}

	const arr = value.split(",");
	if (arr.length !== 2) {
		return code || ErrorCode.FAIL;
	}

	if (arr[0].match(dateRegex) && arr[1].match(dateRegex)) {
		return ErrorCode.SUCCESS;
	}

	return code || ErrorCode.FAIL;
}
/**
 * 日期區間字串驗證
 * true:此欄位符合限制, false: 此欄位不符合限制
 *
 * @export
 * @return {*}  {*}
 */
export function DateRange(code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: dateRange.bind(dateRange, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
