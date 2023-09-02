import request from '@/utils/request'

export function getEmpList(params) {
  return request({
    url: '/emp/getemp',
    method: 'post',
    data: params
  })
}
export function QueryEmp(params) {
  return request({
    url: '/emp/qureyemp',
    method: 'post',
    data: params
  })
}
export function getDeptDegrees(params) {
  return request({
    url: '/emp/getdeptdegree',
    method: 'post',
    data: params
  })
}
export function addEmp(params) {
  return request({
    url: '/emp/addemp',
    method: 'post',
    data: params
  })
}
export function updateEmp(params) {
  return request({
    url: '/emp/updateemp',
    method: 'post',
    data: params
  })
}
export function deleteEmp(params) {
  return request({
    url: '/emp/deleteemp',
    method: 'post',
    data: params
  })
}