import { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import Layout from "../components/layout";
import { useForm } from "../hooks/useForm";
import MapController from "../Logic/MapController";

const configUrl = 'https://port-3002-nodejs-jl-geog-juanlr07645071.preview.codeanywhere.com';

interface IFormData {
  folder: string;
  area: number;
}

type TypeData = {
  folderOptions: string[];
  areaOptions: number[];
}

function fetcher<T>(input: RequestInfo, init?: RequestInit | undefined): Promise<T> {
  console.log(init)
  return fetch(`${configUrl}/config/azgaar-options`, init
).then((res: Response) => res.json());
};

const Start = (/*props: IConfigProps*/) => {

  const initData: IFormData = {
    folder: '',
    area: 0,
  }
  const { formData, onChange, setFormValue } = useForm<IFormData>(initData);

  const { data, error } = useSWR<TypeData>(`${configUrl}/config/azgaar-options`,
    () => fetcher(`${configUrl}/config/azgaar-options`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://port-3000-nodejs-jl-geog-juanlr07645071.preview.codeanywhere.com',
        'Accept': "*/*",
        credentials: 'include',
      },
    }));

  useEffect(() => {
    if (!!data) {
      console.log(data);
      // setFormValue({
      //   folder: data.folderOptions[0],
      //   area: data.areaOptions[0]
      // })
    }
  }, [data]);

  const [state, setState] = useState<string | undefined>(undefined);

  const handleCreateClick = async (e: any) => {
    // e.preventDefault();
    setState(formData.folder)
    console.log('form data', formData);

    // const resFolder: Response = await fetch('/api/building/config/azgaar-folder', {
    const resFolder: Response = await fetch(`${configUrl}/config/azgaar-options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderSelected: formData.folder,
      })
    })

    const resCreate: Response = await fetch(`${configUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        area: formData.area,
      })
    })
  }

  if (error)
    return <Layout name="config"><div>Failed to load</div></Layout>
  if (!data) 
    return <Layout name="config"><div>Loading...</div></Layout>

  return (
    <div>
      <Layout name="config">
        {
          state && <h5>{state}</h5>
        }
        <h1>Config</h1>
        <form>
          <div>
            <label htmlFor="folder">Azgr Folder Selection:</label>
            <select id="folder" name="folder" onChange={(e) => onChange(e.target.value, 'folder')} value={formData.folder}>
              {
                data.folderOptions.map((fol: string, idx: number) => <option key={idx} value={fol}>{fol}</option>)
              }
            </select>
          </div>
          <div>
            <label htmlFor="area">Area media selection:</label>
            <select id="area" name="area" onChange={(e) => onChange(e.target.value, 'area')} value={formData.area}>
              {
                data.areaOptions.map((a: number, idx: number) => <option key={idx} value={a}>{a}</option>)
              }

            </select>
          </div>
          <div>
            <button onClick={handleCreateClick}>Create</button>
          </div>
        </form>
      </Layout>
    </div>
  )
}

export default Start;