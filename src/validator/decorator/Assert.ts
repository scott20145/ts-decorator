/* eslint-disable @typescript-eslint/naming-convention */
import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function assert(attr: string, expect: boolean | number | string, code: ErrorCode, object: object): ErrorCode {
	if (object[attr] === expect) {
		ErrorCode.SUCCESS;
	}
	return code || ErrorCode.FAIL;
}

/**
 * 驗證物件的指定欄位是否符合期望值
 * true:此欄位符合期望值, false: 此欄位不符合期望值
 *
 * @export
 * @param {string} [attr] 欄位名稱
 * @param {boolean|number|string} [attr] 期望值
 * @param {ErrorCode} [code] 錯誤碼
 * @return {*}  {*}
 */
export function Assert(attr: string, expect: boolean | number | string, code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: assert.bind(assert, attr, expect, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
