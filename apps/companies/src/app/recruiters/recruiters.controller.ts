import { Controller, Get, Param } from '@nestjs/common';
import { RecruitersService } from './recruiters.service';

@Controller()
export class RecruitersController {
  constructor(private readonly recruitersService: RecruitersService) {}

  @Get('companies/:companyId/recruiters')
  findAll(@Param('companyId') companyId: string) {
    return this.recruitersService.findAllByCompanyId(companyId);
  }

  @Get('companies/:companyId/recruiters/:id')
  async findOneByCompanyId(
    @Param('companyId') companyId: string,
    @Param('id') id: string
  ) {
    const recruiter = await this.recruitersService.findOne(id);

    if (recruiter.companyId !== companyId) {
      throw new Error('Recruiter not found');
    }

    return recruiter;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitersService.findOne(id);
  }
}
