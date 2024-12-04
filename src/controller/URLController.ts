import { Request, Response } from "express";
import shortId from 'shortid';
import { URL } from "../model/urlModel";

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void>{
        try {
            const { originURL } = req.body;
    
            if (!originURL) {
                res.status(400).json({ error: "originURL is required" });
                return;
            }
            
            const existingURL = await URL.findOne({ originURL });
            if(existingURL){
                res.json(existingURL);
                return;
            }

            const hash = shortId.generate();
            const shortURL = `${process.env.API_URL}/${hash}`;
    
            const newURL = await URL.create({ originURL, hash, shortURL});

            console.log("URL Encurtada: ", newURL);
    
            res.json(newURL);

        } catch (error) {
            console.error("Erro ao encurtar URL: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        try {

            const { hash } = req.params;

            const url = await URL.findOne({hash});

            if(!url){
                res.status(404).json({ error: "URL not found"});
                return;
            }

            res.redirect(url.originURL);

        } catch (error) {
            console.log("Erro ao redirecionar URL: ", error);
            res.status(500).json({error: 'Internal Server Errror'})
        }
    }
}