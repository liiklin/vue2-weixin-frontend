
// 转化个位数为两位数 1 => 01
export const formatNumber = (str) =>{
  return (Number(str) - 10) >= 0 ? str : `0${str}`
}


//
export const formtSkipTime = (str) =>{
  return Number(str) > 0 ? `还有${str}次跳过机会` : '你已经没有跳过机会。'
}
