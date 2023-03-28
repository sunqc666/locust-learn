import { getBackendSrv } from '@grafana/runtime';
import { updateLocation } from 'app/core/actions';
import { ThunkResult } from 'app/types';
import { ReportDTO } from '../../types';
import { reportLoaded, reportsLoaded, reportLoadingBegin, reportLoadingEnd } from './reducers';

export function getReports(): ThunkResult<void> {
  return async dispatch => {
    const reports = await getBackendSrv().get('/api/reports');
    dispatch(reportsLoaded(reports));
  };
}

export function loadReport(id: number): ThunkResult<void> {
  return async dispatch => {
    dispatch(reportLoadingBegin());
    try {
      const report = await getBackendSrv().get(`/api/reports/${id}`);
      dispatch(reportLoaded(report));
    } catch (e) {
      dispatch(reportLoadingEnd());
    }
  };
}

export function sendTestEmail(report: ReportDTO): Promise<any> {
  return getBackendSrv().post(`/api/reports/test-email/`, report);
}

export function deleteReport(id: number): ThunkResult<void> {
  return async dispatch => {
    await getBackendSrv().delete(`/api/reports/${id}`);
    dispatch(getReports());
  };
}

export function createReport(report: ReportDTO): ThunkResult<void> {
  return async dispatch => {
    try {
      await getBackendSrv().post('/api/reports', report);
    } catch (error) {
      throw error;
    }
    dispatch(getReports());
    dispatch(updateLocation({ path: '/reports' }));
  };
}

export function updateReport(report: ReportDTO): ThunkResult<void> {
  return async dispatch => {
    await getBackendSrv().put(`/api/reports/${report.id}`, report);
    dispatch(getReports());
    dispatch(updateLocation({ path: '/reports' }));
  };
}
