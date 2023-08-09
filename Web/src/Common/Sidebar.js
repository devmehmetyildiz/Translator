import React, { useEffect, useState } from 'react'
import { TbGauge, Tb3DRotate, TbAccessPoint, TbActivity } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { MdSettings } from "react-icons/md";
import { Collapse } from 'react-collapse';
import { withRouter } from 'react-router-dom';
import Literals from "../Utils/Literalregistrar"

export function Sidebar(props) {

    const { iconOnly, isMobile, Profile } = props
    const { roles } = Profile

    const checkAuth = (authname) => {
        let isAvailable = false
        if (roles.includes('admin') || roles.includes(authname)) {
            isAvailable = true
        }
        return isAvailable
    }

    const Sidebarliterals = {
        Setting: {
            en: "Settings",
            tr: "Ayarlar"
        },
        Jobs: {
            en: "Jobs",
            tr: "İşlerim"
        },
        Reports: {
            en: "Reports",
            tr: "Raporlar"
        },
        System: {
            en: "System Management",
            tr: "Sistem Yönetimi"
        },
    }

    const Jobitems = [
        ...[
            { id: 1, subtitle: Literals.Orders.Page.Pageheader[Profile.Language], url: "/Orders", permission: checkAuth('orderscreen') },
            { id: 2, subtitle: Literals.Jobs.Page.Pageheader[Profile.Language], url: "/Jobs", permission: checkAuth('jobscreen') },
        ],
        ...(Profile.recordtypes.map((type, index) => {
            return { id: index + 3, subtitle: `${type.Name} ${Literals.Orders.Page.Pageheader[Profile.Language]}`, url: `/Orders?recordType=${type.Uuid}`, permission: checkAuth('orderscreen') }
        }))
    ]

    const defaultpages = [
        {
            id: 1,
            title: Sidebarliterals.Jobs[Profile.Language],
            icon: <TbGauge className=' text-blue-700' />,
            items: Jobitems
        },
        {
            id: 2,
            title: Sidebarliterals.Reports[Profile.Language],
            icon: <TbActivity className=' text-yellow-700' />,
            items: [
                { id: 1, subtitle: Literals.Appreports.Page.Pageheader[Profile.Language], url: "/Appreports", permission: checkAuth('appreportscreen') },
                { id: 2, subtitle: Literals.Flowreports.Page.Pageheader[Profile.Language], url: "/Flowreports", permission: checkAuth('flowreportscreen') },
                { id: 3, subtitle: Literals.Demandreports.Page.Pageheader[Profile.Language], url: "/Demandreports", permission: checkAuth('demandreportscreen') },
            ]
        },
        {
            id: 3,
            title: Sidebarliterals.System[Profile.Language],
            isOpened: false,
            icon: <TbGauge className='text-purple-400' />,
            items: [
                { id: 1, subtitle: Literals.Rules.Page.Pageheader[Profile.Language], url: "/Rules", permission: checkAuth('rulescreen') },
                { id: 2, subtitle: Literals.Mailsettings.Page.Pageheader[Profile.Language], url: "/Mailsettings", permission: checkAuth('mailsettingscreen') },
                { id: 3, subtitle: Literals.Printtemplates.Page.Pageheader[Profile.Language], url: "/Printtemplates", permission: checkAuth('printtemplatescreen') },
            ]
        },
        {
            id: 4,
            title: Sidebarliterals.Setting[Profile.Language],
            isOpened: false,
            icon: <MdSettings className='text-green-800' />,
            items: [
                { id: 1, subtitle: Literals.Roles.Page.Pageheader[Profile.Language], url: "/Roles", permission: checkAuth('rolescreen') },
                { id: 2, subtitle: Literals.Users.Page.Pageheader[Profile.Language], url: "/Users", permission: checkAuth('userscreen') },
                { id: 3, subtitle: Literals.Cases.Page.Pageheader[Profile.Language], url: "/Cases", permission: checkAuth('casescreen') },
                { id: 5, subtitle: Literals.Files.Page.Pageheader[Profile.Language], url: "/Files", permission: checkAuth('filescreen') },
                { id: 6, subtitle: Literals.Courthauses.Page.Pageheader[Profile.Language], url: "/Courthauses", permission: checkAuth('courthausescreen') },
                { id: 7, subtitle: Literals.Courts.Page.Pageheader[Profile.Language], url: "/Courts", permission: checkAuth('courtscreen') },
                { id: 8, subtitle: Literals.Definedcompanies.Page.Pageheader[Profile.Language], url: "/Definedcompanies", permission: checkAuth('definedcompanyscreen') },
                { id: 9, subtitle: Literals.Definedcostumers.Page.Pageheader[Profile.Language], url: "/Definedcostumers", permission: checkAuth('definedcostumerscreen') },
                { id: 10, subtitle: Literals.Documents.Page.Pageheader[Profile.Language], url: "/Documents", permission: checkAuth('documentscreen') },
                { id: 11, subtitle: Literals.Goals.Page.Pageheader[Profile.Language], url: "/Goals", permission: checkAuth('goalscreen') },
                { id: 12, subtitle: Literals.Kdvs.Page.Pageheader[Profile.Language], url: "/Kdvs", permission: checkAuth('kdvscreen') },
                { id: 13, subtitle: Literals.Languages.Page.Pageheader[Profile.Language], url: "/Languages", permission: checkAuth('languagescreen') },
                { id: 14, subtitle: Literals.Payments.Page.Pageheader[Profile.Language], url: "/Payments", permission: checkAuth('paymenttypesscreen') },
                { id: 15, subtitle: Literals.Recordtypes.Page.Pageheader[Profile.Language], url: "/Recordtypes", permission: checkAuth('recordtypescreen') },
                { id: 16, subtitle: Literals.Translators.Page.Pageheader[Profile.Language], url: "/Translators", permission: checkAuth('translatorscreen') },
            ]
        },
    ]

    const [Pages, setPages] = useState(defaultpages)
    const [settedPage, setsettedPage] = useState(-1)
    const openCollapse = (e) => {
        if (!isMobile) {
            const olddata = Pages
            olddata.forEach(element => {
                if (element.id === e) {
                    element.isOpened = !element.isOpened
                } else {
                    element.isOpened = false
                }
            });
            setPages([...olddata])
        }
    }

    const closeCollapse = () => {
        const olddata = Pages
        olddata.forEach(element => {
            element.isOpened = false
        });
        setPages([...olddata])
    }

    useEffect(() => {
        closeCollapse()
    }, [iconOnly])

    useEffect(() => {
        setPages(defaultpages)
    }, [Profile.Language, roles])



    return (
        <div className={`${iconOnly ? 'w-[50px] ' : 'w-[250px] overflow-x-hidden overflow-y-auto'} relative flex flex-col z-40 justify-start items-start mt-[58.61px]  h-[calc(100vh-58.61px)] bg-white dark:bg-Contentfg  transition-all ease-in-out duration-500`}>
            {Pages.map((item, index) => {
                let willshow = false
                item.items.forEach(subitem => {
                    if (subitem.permission) {
                        willshow = true
                    }
                })
                return willshow ? <div key={index} className='w-full flex items-start flex-col relative'
                    onMouseEnter={() => { iconOnly && openCollapse(item.id) }}
                    onMouseLeave={() => { iconOnly && closeCollapse() }}
                >
                    <div className='group py-2 mr-8 flex flex-row rounded-r-full hover:bg-[#c1d8e159] dark:hover:bg-NavHoverbg w-full justify-between items-center cursor-pointer transition-all duration-300'
                        onClick={() => { iconOnly ? setsettedPage(item.id === settedPage ? -1 : item.id) : openCollapse(item.id) }}>
                        <div className='flex flex-row items-center justify-center'>
                            <div className={`ml-2 p-2 text-lg text-purple-600 rounded-full ${settedPage === item.id ? 'bg-[#91131333]' : 'bg-[#6c729333]'}  group-hover:bg-[#7eb7ce] dark:group-hover:bg-Contentfg transition-all duration-300`}>
                                {item.icon}
                            </div>
                            <h1 className={`${iconOnly ? 'hidden' : 'visible'} m-0 ml-2 text-TextColor whitespace-nowrap  text-sm tracking-wider font-semibold  group-hover:text-[#2b7694] transition-all duration-1000`}>
                                {item.title}
                            </h1>
                        </div>
                        {item.items ? <IoIosArrowDown className='text-md mr-4 text-TextColor ' /> : null}
                    </div>
                    {!iconOnly ?
                        <Collapse isOpened={item.isOpened ? item.isOpened : false}>
                            {(item.items || []).map((subitem, index) => {
                                return subitem.permission ? <h1 key={index + index} onAuxClick={() => { window.open(subitem.url, "_blank") }} onClick={() => { props.history.push(subitem.url) }} className=' m-0 cursor-pointer hover:text-[#2b7694] whitespace-nowrap dark:hover:text-white text-TextColor text-sm w-full px-8 py-1' > {subitem.subtitle}</h1> : null
                            })}
                        </Collapse>
                        : <div className={`${settedPage === item.id ? 'visible' : (item.isOpened && settedPage === -1) ? 'visible' : 'hidden'} transition-all ease-in-out p-4 whitespace-nowrap duration-500 max-h-[calc(100vh-${(index + 1) * 50}px-10px)] overflow-y-auto
                        cursor-pointer shadow-lg left-[50px] top-0 z-50 absolute bg-white dark:bg-NavHoverbg rounded-sm`}
                            onMouseLeave={() => {
                                closeCollapse()
                            }}>
                            {item.url ? <h3 className='m-0 cursor-pointer hover:text-[#2b7694] dark:hover:text-white text-TextColor font-bold font-Common'>{item.title}</h3> : <h3 className='text-TextColor font-bold font-Common'>{item.title}</h3>}
                            <div className='h-full overflow-auto'>
                                <Collapse isOpened={settedPage === item.id ? true : (item.isOpened ? item.isOpened : false)}>
                                    {(item.items || []).map((subitem, index) => {
                                        return subitem.permission ? <h1
                                            key={index + index + index}
                                            onAuxClick={() => {
                                                setsettedPage(-1)
                                                closeCollapse()
                                                props.history.push(subitem.url)
                                            }}
                                            onClick={() => {
                                                setsettedPage(-1)
                                                closeCollapse()
                                                props.history.push(subitem.url)
                                            }} className='hover:text-[#2b7694] m-0 whitespace-nowrap dark:hover:text-white text-TextColor text-sm w-full px-2 py-1'>{subitem.subtitle}</h1> : null
                                    })}
                                </Collapse>
                            </div>
                        </div>}
                </div> : null
            })}
        </div >
    )



}
export default withRouter(Sidebar)