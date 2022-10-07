/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function has(obj: Record<string, string | number>, code: ErrorCode, value: string | number): ErrorCode {
	return (obj[value] !== undefined) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
}
/**
 * 欄位資料是否在指定的enum中有定義
 *
 * true:此欄位符合條件, false: 此欄位不符合條件
 *
 * @export
 * @param {ErrorCode} [code] 錯誤碼
 * @return {*}  {*}
 */
export function Has(obj: Record<string, string | number>, code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: has.bind(has, obj, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
