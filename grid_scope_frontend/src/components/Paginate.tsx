import React from 'react'
import {Pagination} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function Paginate({page, pages}:{page:number, pages:number}) {
  

    if (pages <= 1) {
        return null
    }

    return (
        <Pagination>
            {Array.from({ length: pages }, (_, x) => (
                <LinkContainer
                    key={x + 1}
                    to={{

                        search: `?page=${x + 1}`,
                    }}
                    >
                    <Pagination.Item active={x + 1 === page} className="m-1">
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}
export default Paginate