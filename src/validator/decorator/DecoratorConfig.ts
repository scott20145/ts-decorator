/* eslint-disable @typescript-eslint/naming-convention */

import { ErrorCode } from "../../models/commonModels/enum";

export interface DecoratorConfig {
	/** 待驗物件 */
	object: object;
	/** 待驗物件的屬性名稱 */
	propertyName: string;
	/** decorator函式名稱 */
	decoratorName?: string;
	/** decorator函式 */
	exec: (...args: unknown[]) => ErrorCode;
	/** 此error對應的錯誤碼 */
	code?: ErrorCode;
}
