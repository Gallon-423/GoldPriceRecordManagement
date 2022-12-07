import instance from "./intercept";

export interface MetalRecord {
  cnname: string;
  latestpri: number;
  limit: string;
  maxpri: number;
  minpri: number;
  id?: number;
  openpri: number;
  time: string;
  totalvol: number;
  variety: string;
  yespri: number;
}



export interface VarietyResponse {
  variety: Variety[];
  variety_num: number;
}

export interface Variety {
  cnname: string;
  variety: string;
}

export interface InsertRecordRequest {
  cnname: null | string;
  latestpri: number | null;
  limit: null | string;
  maxpri: number | null;
  minpri: number | null;
  openpri: number | null;
  time: null | string;
  totalvol: number | null;
  variety: null | string;
  yespri: number | null;
}

// GET /api/records/{no} 根据id获取记录
export async function getRecord(id: number): Promise<MetalRecord | null> {
  try {
    const response = await instance.get(`/api/records/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

// GET /api/records/all 获取所有记录
export async function getRecords(): Promise<MetalRecord[] | null> {
  try {
    const response = await instance.get("/api/records/all");
    return response.data;
  } catch (error) {
    return null;
  }
}

// GET /api/records/varieties 获取所有金属种类
export async function getVarieties(): Promise<VarietyResponse | null> {
  try {
    const response = await instance.get(`/api/records/varieties`);
    console.log("getVarieties->", response.data);
    return response.data;
  } catch (error) {
    return null;
  }
}

// GET /api/records/variety/{variety} 根据金属种类获取所有记录
export async function getRecordsByVariety(
  variety: string
): Promise<MetalRecord[] | null> {
  try {
    const response = await instance.get(`/api/records/variety/${variety}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

// GET 获取金属七天平均成交量
export async function getAverVol(variety: string) {
  try {
    const response = await instance.get(`/api/aver/${variety}`);
    console.log("getAverVol->" + response.data);
    return response.data;
  } catch (error) {
    return null;
  }
}

// DELETE /api/records/{id} 删除记录
export async function deleteRecord(id: number) {
  await instance.delete(`/api/records/${id}`);
}


// POST /api/records 插入记录
export async function insertRecord(record: MetalRecord) {
  await instance.post(`/api/records`,record);
}

// PUT /api/records/{id} 更新记录
export async function updateRecord(id:number,record: MetalRecord) {
  await instance.put(`/api/records/${id}`,record);
}