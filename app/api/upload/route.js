import {NextResponse} from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req,res) {
    const formData = await req.formData();
    const file = formData.get('files');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let nameArr = file.name.split(".");

    // ensure always unique name
    const uniqueName = nameArr[0] + "-" + Date.now() + "." + nameArr[1];
    const filename = uniqueName.replaceAll(" ", "_");

    const path = join(process.cwd(),"/public/upload/",filename);
    const publicPath = `/upload/${filename}`
    await writeFile(path,buffer);
    
    try{
        return NextResponse.json({status:"success",publicPath:publicPath})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}