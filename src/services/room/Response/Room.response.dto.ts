import { ApiProperty } from "@nestjs/swagger"

export class RoomResponse {

    id: number
    @ApiProperty()
    address: string

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    price: number

    @ApiProperty()
    places: number

    @ApiProperty()
    weekDays: string[]

    @ApiProperty()
    timeStart: Date
    
    @ApiProperty()
    timeEnd: Date

    picture: {name: string}[]
}