from fastapi import APIRouter, HTTPException, Request

from app.database import SessionDep
from app.logs.exceptions import LogNotFoundError, LogStoreError
from app.logs.schemas import LogCreate, LogResponse
from app.logs.service import LogService
from app.shared.rate_limiter import rate_limiter

router = APIRouter(prefix="/v1/logs", tags=["logs"])


@router.post(
    "",
    response_model=LogResponse,
)
@rate_limiter(limit=5, window=60)
async def create_log(request: Request, log: LogCreate, db: SessionDep):
    try:
        return await LogService.create_log(db, log)
    except LogStoreError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.get(
    "",
    response_model=list[LogResponse],
)
@rate_limiter(limit=20, window=60)
async def list_logs(
    request: Request,
    db: SessionDep,
    service: str | None = None,
    level: str | None = None,
):
    return await LogService.list_logs(db, service, level)


@router.get(
    "/stats",
)
@rate_limiter(limit=100, window=60)
async def get_stats(request: Request, db: SessionDep):
    return await LogService.get_stats(db)


@router.get(
    "/trends",
)
@rate_limiter(limit=100, window=60)
async def get_trends(request: Request, db: SessionDep):
    return await LogService.get_trends(db)


@router.get(
    "/issues",
)
@rate_limiter(limit=100, window=60)
async def get_issues(request: Request, db: SessionDep):
    return await LogService.get_issues(db)


@router.get(
    "/alerts",
)
@rate_limiter(limit=100, window=60)
async def get_alerts(request: Request, db: SessionDep):
    return await LogService.get_alerts(db)


@router.get(
    "/reports",
)
@rate_limiter(limit=100, window=60)
async def get_reports(request: Request, db: SessionDep):
    return await LogService.get_reports(db)


@router.get(
    "/{log_id}",
    response_model=LogResponse,
)
@rate_limiter(limit=20, window=60)
async def get_log(request: Request, log_id: str, db: SessionDep):
    try:
        return await LogService.get_log(db, log_id)
    except LogNotFoundError as e:
        raise HTTPException(status_code=404, detail="Log not found") from e


@router.delete("/{log_id}")
@rate_limiter(limit=2, window=60)
async def delete_log(request: Request, log_id: str, db: SessionDep):
    try:
        await LogService.delete_log(db, log_id)
        return {"status": "deleted"}
    except LogNotFoundError as e:
        raise HTTPException(status_code=404, detail="Log not found") from e
