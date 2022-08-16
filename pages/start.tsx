import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import Layout from "../components/layout";
import useFetch from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";

// const configUrl = 'https://port-4000-nodejs-jl-geog-juanlr07645071.preview.codeanywhere.com';
// const configUrl = 'http://localhost:4000';
const configUrl = '/api';

interface IFormData {
  folder: string;
  area: number;
}

type TypeData = {
  folderOptions: string[];
  areaOptions: number[];
}

const areaOptions = [12100, 8100, 4100, 2100, 810];

const Start = (/*props: IConfigProps*/) => {

  const initData: IFormData = {
    folder: '',
    area: 0,
  }
  const { formData, onChange, setFormValue } = useForm<IFormData>(initData);

  const [azgOpts, setAzgOpts] = useState<string[]>([])
  const [isLoading, setLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    setLoading(true)
    fetch(`${configUrl}/config/azgaar-options`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "*/*",
        credentials: 'include',
      },
    })
      .then((res: Response) => res.json())
      .then((data: string[]) => {
        setAzgOpts(data)
        setLoading(false)
        setFormValue({
          folder: data[0],
          area: areaOptions[0]
        })
      })
      .catch((e: any) => {
        console.log(e);
      })
  }, []);

  const handleCreateClick = async (e: any) => {
    e.preventDefault();

    console.log(formData)

    const resFolder: Response = await fetch(`${configUrl}/config/azgaar-options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        selected: formData.folder,
      })
    })
    console.log(resFolder)

    if (resFolder.status === 201) {
      const resCreate: Response = await fetch(`${configUrl}/config/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area: +formData.area,
        })
      })
      console.log(resCreate)

      if (resCreate.status === 201) {
        router.push('/test')
      }
    }

  }

  if (isLoading)
    return <Layout name="config"><div>Loading...</div></Layout>
  if (azgOpts.length == 0)
    return <Layout name="config"><div>Failed to load</div></Layout>

  return (
    <Layout name="config">
      <h1>Config</h1>
      <form>
        <div>
          <label htmlFor="folder">Azgr Folder Selection:</label>
          <select id="folder" name="folder" onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value, 'folder')} value={formData.folder}>
            {
              azgOpts.map((fol: string, i: number) => <option key={i} value={fol}>{fol}</option>)
            }
          </select>
        </div>
        <div>
          <label htmlFor="area">Area media selection:</label>
          <select id="area" name="area" onChange={(e) => onChange(e.target.value, 'area')} value={formData.area}>
            {
              areaOptions.map((a: number, i: number) => <option key={i} value={a}>{a}</option>)
            }
          </select>
        </div>
        <div>
          <button onClick={handleCreateClick}>Create</button>
        </div>
      </form>
    </Layout>
  )
}

export default Start;