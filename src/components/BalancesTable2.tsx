import { Table } from '@gnosis.pm/safe-react-components';
import { TokenBalance, TokenInfo, TokenType } from '@gnosis.pm/safe-apps-sdk';
import BigNumber from 'bignumber.js';
import React from 'react'
import '../index.css'

const ethToken: TokenInfo = {
    address: '0x0000000000000',
    type: TokenType.NATIVE_TOKEN,
    logoUri: './eth.svg',
    symbol: 'ETH',
    name: 'Ether',
    decimals: 18,
};

const formatTokenValue = (value: number | string, decimals: number): string => {
    return new BigNumber(value).times(`1e-${decimals}`).toFixed();
};

const formatFiatValue = (value: string, currency: string): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(value));
};

const fields = ['Asset', 'Amount', 'USD']

const items:any =[
  {
    data: {
      token: "ETH",
      address: "native",
      amount: 0,
      dollar: "$0.00",
      withdraw: "checking..."
    },
    values: {
      address: "eth"
    },
    classNames: {
      token: "text-[#FFFFFFCC]",
      dollar: "",
      amount: "ml-1"
    },
    images: {
      token: "/eth.svg"
    },
    buttons: {
      withdraw: {
        Unlock: {
          show: true,
          actionParam: "eth",
          includeLoading: true
        },
        Lock: {
          show: false,
          actionParam: "eth",
          includeLoading: true
        },
        Withdraw: {
          show: false,
          actionParam: "eth"
        }
      }
    },
    warning: {},
    tags: {},
    styles: {}
  },
  {
    data: {
      token: "DAI",
      address: "0x0a...3CDD",
      amount: 0,
      dollar: "$0.00",
      withdraw: "checking..."
    },
    values: {
      address: "0x0a1F0598A561af6b84A726bE007f581E812C3CDD"
    },
    classNames: {
      token: "text-[#FFFFFFCC]",
      dollar: "",
      amount: "ml-1"
    },
    images: {
      token: "/dai.svg"
    },
    buttons: {
      withdraw: {
        Unlock: {
          show: true,
          actionParam: "0x0a1F0598A561af6b84A726bE007f581E812C3CDD",
          includeLoading: true
        },
        Lock: {
          show: false,
          actionParam: "0x0a1F0598A561af6b84A726bE007f581E812C3CDD",
          includeLoading: true
        },
        Withdraw: {
          show: false,
          actionParam: "0x0a1F0598A561af6b84A726bE007f581E812C3CDD"
        }
      }
    },
    warning: {},
    tags: {},
    styles: {}
  },
  {
    data: {
      token: "USDC",
      address: "0x4d...2c48",
      amount: 0,
      dollar: "$0.00",
      withdraw: "checking..."
    },
    values: {
      address: "0x4dF8d8AA018cABB7c1194E6Df064961ea3572c48"
    },
    classNames: {
      token: "text-[#FFFFFFCC]",
      dollar: "",
      amount: "ml-1"
    },
    images: {
      token: "/usdc.svg"
    },
    buttons: {
      withdraw: {
        Unlock: {
          show: true,
          actionParam: "0x4dF8d8AA018cABB7c1194E6Df064961ea3572c48",
          includeLoading: true
        },
        Lock: {
          show: false,
          actionParam: "0x4dF8d8AA018cABB7c1194E6Df064961ea3572c48",
          includeLoading: true
        },
        Withdraw: {
          show: false,
          actionParam: "0x4dF8d8AA018cABB7c1194E6Df064961ea3572c48"
        }
      }
    },
    warning: {},
    tags: {},
    styles: {}
  },
  {
    data: {
      token: "DAI",
      address: "0x5c...BBaA",
      amount: 0,
      dollar: "$0.00",
      withdraw: "checking..."
    },
    values: {
      address: "0x5c392FFF741F3f1e1544d308f9ADD02a3C38BBaA"
    },
    classNames: {
      token: "text-[#FFFFFFCC]",
      dollar: "",
      amount: "ml-1"
    },
    images: {
      token: "/dai.svg"
    },
    buttons: {
      withdraw: {
        Unlock: {
          show: true,
          actionParam: "0x5c392FFF741F3f1e1544d308f9ADD02a3C38BBaA",
          includeLoading: true
        },
        Lock: {
          show: false,
          actionParam: "0x5c392FFF741F3f1e1544d308f9ADD02a3C38BBaA",
          includeLoading: true
        },
        Withdraw: {
          show: false,
          actionParam: "0x5c392FFF741F3f1e1544d308f9ADD02a3C38BBaA"
        }
      }
    },
    warning: {},
    tags: {},
    styles: {}
  }
]
const widths:any={ "withdraw": "min-w-[200px] max-w-[200px] justify-end" }
function Balances({ balances }: { balances: TokenBalance[] }): JSX.Element {
    return (
        <div className={`w-full`}>
        {items && items.length > 0 && (
            <div className="w-full" >
              <div className='menu rounded-md flex items-center w-full p-3 text-xs text-[#ffffff80]'>
                {fields.map((field, idx) => {
                  return (
                    <div 
                      key={idx}
                      className={`text-left cursor-pointer uppercase mr-4 "min-w-[200px] max-w-[200px] justify-end"  ${widths[field] ||  'w-full'}`}            
                    >
                      <div className={`flex items-center 'w-full'}`}>
                        <div className={`"text-white" transition-all`}>{field}</div>
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 13.5C7.72386 13.5 7.5 13.2761 7.5 13L7.5 4.20711L3.85355 7.85355C3.65829 8.04882 3.34171 8.04882 3.14645 7.85355C2.95118 7.65829 2.95118 7.34171 3.14645 7.14645L7.64645 2.64645C7.84171 2.45118 8.15829 2.45118 8.35355 2.64645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355C12.6583 8.04882 12.3417 8.04882 12.1464 7.85355L8.5 4.20711L8.5 13C8.5 13.2761 8.27614 13.5 8 13.5Z" fill="white" fillOpacity="0.8"/>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="w-full">
                {items.map((item:any, idx:any) => {
                  if(!item.classNames) item.classNames = {}
                  if(!item.tags) item.tags = {};
                  if(!item.styles) item.styles = {};
                  if(!item.values) item.values = {};
                  if(!item.images) item.images = {};
                  if(!item.buttons) item.buttons = {};
                  if(!item.warning) item.warning = {}
                  return (
                    <div
                    key={idx}
                    className={`
                      text-[#ffffff80] text-sm ${idx !== 0 && "border-t-[1px]"}  border-[#CFE4FF14] whitespace-nowrap flex items-center py-4 px-3
                      "bg-transparent"} rounded-lg
                    `}
                    > 
                      {fields.map((field, jdx) => {
                        return (
                          <div key={jdx} className={`mr-4 flex items-center ${widths[field] || `w-full`}
                          `}>
                            {item.images[field] && (
                              <img src={item.images[field]} width="40" height="40" alt="" className="mr-3" />
                            )}
                            {(!item.tags[field] && !item.buttons[field]) && (
                              <div 
                                className={`mr-4 truncate ${item.classNames[field] || ""}`}
                                style={item.styles[field]}
                              >{item.data[field]}</div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
        )}
      </div>

        // <Table
        //     headers={[
        //         { id: 'col1', label: 'Asset' },
        //         { id: 'col2', label: 'Amount' },
        //         { id: 'col3', label: `Value, USD` },
        //     ]}
        //     rows={balances.map((item: TokenBalance, index: number) => {
        //         const token = item.tokenInfo.type === 'NATIVE_TOKEN' ? ethToken : item.tokenInfo;

        //         return {
        //             id: `row${index}`,
        //             cells: [
        //                 {
        //                     content: (
        //                         <div style={{ display: 'flex', alignItems: 'center' }}>
        //                             <img src={token.logoUri || undefined} alt={`${token.symbol} Logo`} />
        //                             {token.name}
        //                         </div>
        //                     ),
        //                 },

        //                 { content: formatTokenValue(item.balance, token.decimals) },
        //                 { content: formatFiatValue(item.fiatBalance, 'USD') },
        //             ],
        //         };
        //     })}
        // />
    );
}

export default Balances;