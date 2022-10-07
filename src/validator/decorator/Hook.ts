/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function hook(fn: (...args: any[]) => { code: ErrorCode, msg?: "" }, attrs: string[], code: ErrorCode, object: object): ErrorCode {
	const result = fn(...attrs.map((key) => object[key]));
	if (code !== undefined && result.code === ErrorCode.FAIL) {
		return code;
	}

	return result.code;
}

/**
 * 將該物件的指定屬性透過外部函式進行驗證
 *
 * @export
 * @param {(...args: any[]) => ErrorCode} fn 驗證函式
 * @param {string[]} attrs 驗證函式該物件的屬性陣列
 * @param {ErrorCode} 錯誤碼,若帶入此值會強制覆蓋掉驗證函式的錯誤碼
 * @return {*}  {*}
 */
export function Hook(fn: (...args: any[]) => { code: ErrorCode, msg?: "" }, attrs: string[], code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			decoratorName: "Hook",
			exec: hook.bind(hook, fn, attrs, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
