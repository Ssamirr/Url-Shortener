import React, { SyntheticEvent, useState } from 'react'
import { IUrlService } from '../service/IUrlService'
import { url } from "../model/Url";
import { toast } from 'react-toastify';

function UrlShorter() {

    const [text, setText] = useState<string>("");
    const [shortUrl, setShortUrl] = useState<url[]>([]);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        let urlServise = new IUrlService()
        urlServise.getİnfo(text)
            .then(data => {
                setShortUrl([...shortUrl, {
                    original_link: data.original_link,
                    full_short_link: data.full_short_link
                }])
            })
            .catch(err => {
                toast.error("Write correct url")
                return err;
            })
        setText("");
    }

    const copyUrl = (url:string) => {
        navigator.clipboard.writeText(url)
        toast.success("Copied")
    }

    return (
        <div className='url-shorter'>
            <h1>Url Shorter</h1>
            <form onSubmit={(e) => handleSubmit(e)} className='url'>
                <div className='url-input'>
                    <input required value={text} onChange={(e) => setText(e.target.value)} placeholder='link' />
                </div>
                <div className='url-button'>
                    <button>Shorten it!</button>
                </div>
            </form>
            <div className='shorter-links'>
                {shortUrl &&
                    React.Children.toArray(
                        shortUrl.map((item: any) =>
                        (
                            <div className='links'>
                                <div className='original-link'>{item.original_link}</div>
                                <div className='link-right'>
                                    <a rel="noreferrer" target={"_blank"} href={item.full_short_link} className='short-link'>{item.full_short_link}</a>

                                    <button onClick={() => copyUrl(item.full_short_link)}
                                    >Copy</button>

                                </div>
                            </div>
                        )))

                }
            </div>
        </div>
    )
}

export default UrlShorter