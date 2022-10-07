/* eslint-disable @typescript-eslint/naming-convention */

import { ErrorCode } from "../../models/commonModels/enum";
import { RegisterDecorator } from "../RegisterDecorator";
import { DecoratorConfig } from "./DecoratorConfig";

function compare(target: number, op: CompareOp, code: ErrorCode, value: number): ErrorCode {
	switch (op) {
		case CompareOp.LT:
			return (value < target) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
		case CompareOp.LE:
			return (value <= target) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
		case CompareOp.EQ:
			return (value === target) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
		case CompareOp.NE:
			return (value !== target) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
		case CompareOp.GE:
			return (value >= target) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
		case CompareOp.GT:
			return (value > target) ? ErrorCode.SUCCESS : code || ErrorCode.FAIL;
	}

}

export enum CompareOp {
	/**
	 * 小於
	 * */
	LT,
	/** 小於等於 */
	LE,
	/** 等於 */
	EQ,
	/** 不等於 */
	NE,
	/** 大於等於 */
	GE,
	/** 大於 */
	GT
}

/**
 * 數值比較工具
 *
 * true:此欄位滿足指定條件, false: 此欄位小於指定數字
 */
export function Compare(target: number, op: CompareOp, code?: ErrorCode): any {
	return (object: object, propertyName: string) => {
		const config: DecoratorConfig = {
			object,
			propertyName,
			exec: compare.bind(compare, target, op, code)
		};
		RegisterDecorator(object, propertyName, config);
	};
}
